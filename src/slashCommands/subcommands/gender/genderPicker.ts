import dailyPronouns, { Daily } from "../../../schemas/dailyPronouns";
import pronounInfo, { PronounInfo } from "../../../schemas/pronounInfo";
import { CommandHandler } from "../../../utils/interfaces/commandHandler.inteface";

export class GenderPicker implements CommandHandler {
  private _pronounInfos: PronounInfo;
  private _dailies: Daily;
  private _pResults: Array<string>;
  private _aResults: Array<string>;

  userId: string;
  constructor(userId: string) {
    this.userId = userId;
  }
  async init(): Promise<boolean> {
    this._pronounInfos = await pronounInfo.findOne({ userId: this.userId });
    this._dailies = await dailyPronouns.findOne({ userId: this.userId });
    if (!this._pronounInfos) {
      return false;
    }
    return true;
  }

  async updateDb(): Promise<void> {
    if (this._dailies) {
      await dailyPronouns.findOneAndUpdate(
        { userId: this.userId },
        {
          pronom: [...new Set(this._pResults)],
          accord: [...new Set(this._aResults)],
          already_picked: [...new Set(this._pResults)],
        }
      );
    } else {
      await dailyPronouns.create({
        userId: this.userId,
        pronom: [...new Set(this._pResults)],
        accord: [...new Set(this._aResults)],
        already_picked: [...new Set(this._pResults)],
      });
    }
  }

  public get pronounInfos(): PronounInfo {
    return this._pronounInfos;
  }

  public get dailies(): Daily {
    return this._dailies;
  }

  public generatePronouns(
    pronouns: Array<string>,
    iterations: number
  ): Array<string> {
    this._pResults = this._dailies.pronom;
    const working_list = pronouns.filter((elt: string) => {
      return this._dailies.already_picked.indexOf(elt) === -1;
    });

    if (iterations > 0) {
      this._pResults = this._generateList(working_list, iterations);
    } else {
      this._pResults = ["aucun"];
    }
    return this._pResults;
  }

  public generateAccords(
    accords: Array<string>,
    iterations: number
  ): Array<string> {
    this._aResults = this._dailies.accord;
    if (iterations > 0) {
      this._aResults = this._generateList(accords, iterations);
    } else {
      this._aResults = ["aucun"];
    }
    return this._aResults;
  }

  private _generateList(array: Array<string>, iter: number): Array<string> {
    let list: Array<string> = [];
    let cpt: number = 0;
    while (array.length > 0 && cpt < iter) {
      let tmp = array.sample();
      list.push(tmp);
      array.splice(array.indexOf(tmp), 1);
      cpt++;
    }
    return list;
  }
}
