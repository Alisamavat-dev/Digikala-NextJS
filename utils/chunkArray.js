import array from "lodash/array";

export default function ChunkArray(list, size) {
  return array.chunk(list, size);
}
