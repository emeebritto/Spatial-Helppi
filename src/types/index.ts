export type ClickEvent = React.MouseEvent<HTMLElement, MouseEvent>;
export type anys = any[];

export interface Obj {
  [key:string]:any;
}

export interface Styles {
  minWidth?:string;
  width?:string;
  maxWidth?:string;
  minHeight?:string;
  height?:string;
  maxHeight?:string;
  border_right?:string;
  border_left?:string;
  background_color?:string;
  margin?:string;
  padding?:string;
  spec?:string;
  shadowColor?:string;
  transform?:string;
  show?:boolean;
}

export interface Position {
  x:number;
  y:number;
}

export interface Dimension {
  w:number;
  h:number;
}

export interface Metrics extends Position, Dimension {}