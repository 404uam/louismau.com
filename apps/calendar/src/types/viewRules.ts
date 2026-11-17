export type ViewRules = {
  anchor: "month" | "week" | "day";
  navigation: { unit: "month" | "day"; amount: number };
  range: { start: "week" | "anchor"; length: number };
  layout: "month" | "time";
  heading: string;
  label: string;
  navigationUnit: string;
};
