type Delet = "D";
type Insert = "I";
type Match = "M";
type Method = Delet | Insert | Match;
type StringRange = [number, number]
type DiffDelete = [Delet, null, StringRange];
type DiffInsert = [Insert, StringRange, null];
type DiffMatch = [Match, StringRange, StringRange];
type DiffDetail = DiffDelete | DiffInsert | DiffMatch;
type DiffResult = DiffDetail[];

const diffText = (ori: string, comp: string): DiffResult => {
  return [
    ["D", null, [0,4]],
    ["M",  [1,5], [5,10]],
    ["M",  [0,0], [0,4]],
  ];
};

export default diffText;
