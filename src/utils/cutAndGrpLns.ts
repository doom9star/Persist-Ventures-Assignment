export default function cutAndGrpLns(content: string) {
  if (content.includes("\n")) return [content];

  let lines = content.split(".");
  const result = [];

  while (lines.length > 0) {
    let temp = lines.slice(0, 5).join(".").trim();
    if (temp) {
      if (temp.slice(-1)[0] !== ".") temp += ".";
      result.push(temp);
    }
    lines.splice(0, 5);
  }

  return result;
}
