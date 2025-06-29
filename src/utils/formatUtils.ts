export const formatFileNameAsTitle = (fileName: string): string => {
  // Remove file extension and replace underscores with spaces
  const title = fileName.replace(/\.[^/.]+$/, "").replace(/_/g, " ");
  return title.charAt(0).toUpperCase() + title.slice(1);
}

export const parseSection = (section: string) => {
  const [title, ...contentLines] = section.split("\n");
  const cleanTitle = title.startsWith("##") 
    ? title.substring(2).trim()
    : title.startsWith('#') ? title.substring(2).trim() : title.trim();

  const points: String[] = [];
  contentLines.forEach((line) => {
    const trimmedLine = line.trim();
    if (trimmedLine.startsWith("-")) {
      points.push(trimmedLine.substring(1).trim());
    } else if (trimmedLine) {
      points.push(trimmedLine);
    }
  });

  return {
    title: cleanTitle,
    content: points.filter(
      (point) => point && !point.startsWith("#") && !point.startsWith("[Choose")
    ),
  };
};

export const parsePoint = (point: string) => {
  const isNumbered = /^\d+\./.test(point);
  const isMainPoint = /^-/.test(point);
  const emojiRegex = /[\u{1F300}-\u{1F9FF}]|[\u{2600}-\u{26FF}]/u;

  const hasEmoji = emojiRegex.test(point);
  const isEmpty = !point.trim();

  return {isNumbered, isMainPoint, hasEmoji, isEmpty};
}

export const parseEmojiContent = (content: string) => {
  const cleanContent = content.replace(/^[-]\s*/, '').trim();
  const matches = cleanContent.match(/^(\p{Emoji}+)(.+)$/u)
  if(!matches) return null;

  const [_, emoji, text] = matches;
  return {
    emoji: emoji.trim(),
    text: text.trim()
  };
}