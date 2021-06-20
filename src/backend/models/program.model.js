module.exports = mongoose => {
  const Program = mongoose.model(
    "program",
    mongoose.Schema(
      {
        sourceCode: String,
      },
      { timestamps: true }
    )
  );

  return Program;
};
