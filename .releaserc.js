const presetConfig = {
  types: [
    { type: "feat", section: "🚀 Features", hidden: false },
    { type: "fix", section: "🐛 Bug Fixes", hidden: false },
    { type: "docs", section: "📖 Docs", hidden: true },
    { type: "style", section: "🎨 Styles", hidden: true },
    { type: "refactor", section: "🔩 Refactor", hidden: true },
    { type: "perf", section: "⚡️ Performances", hidden: true },
    { type: "test", section: "✅ Tests", hidden: true },
    { type: "ci", section: "🔁 CI", hidden: true },
    { type: "chore", section: "🧹 Chore", hidden: true },
  ],
};

let config = {
  branches: ["main"],
  plugins: [],
};

const preparing = process.env.PREPARING;

const changelogPlugin = [
  "@semantic-release/release-notes-generator",
  {
    presetConfig,
    preset: "conventionalcommits",
    linkCompare: !preparing,
    linkReferences: !preparing,
  },
];
if (preparing) {
  config.plugins.push(changelogPlugin);
} else {
  config.plugins = [
    "@semantic-release/commit-analyzer",
    changelogPlugin,
    "@semantic-release/changelog",
    "@semantic-release/github",
    "@semantic-release/git"
  ]
}

module.exports = config;
