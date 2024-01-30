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

    let i = 0;
    if (iterations > 0) {
      this._pResults = [];
      while (working_list.length > 0 && i < iterations) {
        let temp = working_list.sample();
        this._pResults.push(temp);
        working_list.splice(working_list.indexOf(temp), 1);
        i = i + 1;
      }
    }

    return this._pResults;
  }

  public generateAccords(
    accords: Array<string>,
    iterations: number
  ): Array<string> {
    this._aResults = this._dailies.accord;
    let j = 0;
    if (iterations > 0) {
      this._aResults = [];
      while (accords.length > 0 && j < iterations) {
        let tmp = accords.sample();
        this._aResults.push(tmp);
        accords.splice(accords.indexOf(tmp), 1);
        j = j + 1;
      }
    }
    return this._aResults;
  }
}
