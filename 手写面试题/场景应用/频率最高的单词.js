function counts(article) {
  article = article.trim().toLowerCase();
  let array = article.match(/[A-z]+/g);
  article = " " + array.join("  ") + " ";

  let word,
    words = new Map();

  for (let i = 0; i < array.length; i++) {
    word = array[i];
    words.has(word) ? words.set(word, words.get(word) + 1) : words.set(word, 1);
  }
  console.log(
    Array.from(words)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 3)
  );
}

counts(
  "Age has reached the end of the beginning of a word. May be guilty in his seems to passing a lot of different life became the appearance of the same day;"
);
