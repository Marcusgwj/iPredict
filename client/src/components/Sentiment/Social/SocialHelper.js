export const groupData = (data) => {
  return groupMentions(
    data.reduce((group, product) => {
      const { atTime } = product;
      let time = atTime.slice(0, 10);
      time = time.slice(8) + "/" + time.slice(5, 7) + "/" + time.slice(0, 4);
      group[time] = group[time] ?? [];
      group[time].push(product);
      return group;
    }, {})
  );
};

const groupMentions = (data) => {
  for (let key in data) {
    data[key] = data[key].reduce((group, product) => {
      const { negativeMention, positiveMention } = product;
      group["negativeMention"] = group["negativeMention"] ?? 0;
      group["positiveMention"] = group["positiveMention"] ?? 0;
      group["negativeMention"] += negativeMention;
      group["positiveMention"] += positiveMention;
      return group;
    }, {});
  }
  return structure(data);
};

const structure = (obj) => {
  const arr = [];
  for (let key in obj) {
    arr.push({
      date: key,
      positiveMention: obj[key]["positiveMention"],
      negativeMention: -obj[key]["negativeMention"],
    });
  }
  return arr.reverse();
};
