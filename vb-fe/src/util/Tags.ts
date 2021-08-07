/**
 * @var label      name of the tag
 * @var value      value of the tag. set to the name
 * @var score      score/popularity value of the tag
 * @var __isNew__  an extra variable added by react-select to
 *                 to denote if the tag is new
 */
export interface Tag {
  _id: string;
  label: string;
  value: string;
  score: number;
  __isNew__?: boolean;
}
