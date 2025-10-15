import { SeenFrame } from "@/types/historic";

export interface UserData {
  seenFrames?:SeenFrame[];
}

export interface ForYouConfigs {
  len:number;
};

export interface FeedConfig {
  forYou?:ForYouConfigs;
}

export interface FeedForm {
  contents:string[];
  // fixed_order:boolean;
  userData:UserData;
  configs:FeedConfig;
}
