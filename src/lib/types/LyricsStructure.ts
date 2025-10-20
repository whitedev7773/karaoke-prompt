/*
일반
[
    ["원문", "발음", "번역"],
    ["원문", "발음", "번역"],
    ["원문", "발음", "번역"],
    ...
]

발음만
[
    "발음", "발음", "발음", ...
]

원문/번역만
[
    ["원문", "번역"],
    ["원문", "번역"],
    ["원문", "번역"],
    ...
]
*/
export type LyricsStructure = Array<[string, string, string]>;
export type LyricsPronunciation = Array<string>;
export type LyricsTranslation = Array<[string, string]>;
