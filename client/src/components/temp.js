function handleChange(event) {
  console.log(event.target.type);
  if (event.target.type === "file") {
    const fileData = event.target.files[0];
    setData({ ...data, [event.target.name]: fileData });
  } else if (event.target.type === "checkbox") {
    const languageData = data.language;
    console.log(
      "🚀 ~ file: Form.js:78 ~ handleChange ~ languageData:",
      languageData,
      languageData.length
    );
    if (languageData.length > 0) {
      const tempArr = languageData.filter((item) => item !== event.target.name);
      console.log("🚀 ~ file: Form.js:82 ~ handleChange ~ tempArr:", tempArr);
      setData({ ...data, language: tempArr });
    } else {
      let tempArr = [...languageData];
      tempArr.push(event.target.name);
      console.log("🚀 ~ file: Form.js:91 ~ handleChange ~ tempArr:", tempArr);
      setData({ ...data, language: tempArr });
    }
  } else {
    setData({ ...data, [event.target.name]: event.target.value });
  }
}
