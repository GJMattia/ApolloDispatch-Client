export function getDateClass(regDate) {
  const now = new Date();
  const reg = new Date(regDate);
  const currentMonth = now.getMonth();
  const currentYear = now.getFullYear();
  const regMonth = reg.getMonth();
  const regYear = reg.getFullYear();
  const monthDiff = (regYear - currentYear) * 12 + (regMonth - currentMonth);
  if (monthDiff <= 0) return "date-red";
  if (monthDiff <= 3) return "date-yellow";
  return "date-green";
}

export function getBooleanFieldData(vehicles, fieldName, label) {
  let trueCount = 0;
  let falseCount = 0;

  vehicles.forEach((vehicle) => {
    if (vehicle[fieldName] === true) {
      trueCount++;
    } else if (vehicle[fieldName] === false) {
      falseCount++;
    }
  });

  return { label, true: trueCount, false: falseCount };
}

export function getPieChartData(vehicles, fieldName, label) {
  // Check what type of data the field contains
  const isBooleanField = vehicles.some(
    (v) => v[fieldName] === true || v[fieldName] === false
  );

  if (isBooleanField) {
    let trueCount = 0;
    let falseCount = 0;

    vehicles.forEach((vehicle) => {
      if (vehicle[fieldName] === true) {
        trueCount++;
      } else if (vehicle[fieldName] === false) {
        falseCount++;
      }
    });

    return { label, true: trueCount, false: falseCount };
  } else {
    // Status (0, 1, 2)
    let count0 = 0;
    let count1 = 0;
    let count2 = 0;

    vehicles.forEach((vehicle) => {
      if (vehicle[fieldName] === 0) count0++;
      else if (vehicle[fieldName] === 1) count1++;
      else if (vehicle[fieldName] === 2) count2++;
    });

    return { label, 0: count0, 1: count1, 2: count2 };
  }
}
