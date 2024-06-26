const baseUrl = "https://wedev-api.sky.pro/api/leaderboard";
export async function getLeaderboard() {
  const response = await fetch(baseUrl, {
    method: "GET",
  });
  if (!response.ok) {
    throw new Error("Что-то поломалось");
  } else {
    const responseData = await response.json();
    return responseData;
  }
}

export async function postLeaderboard({ name, time }) {
  if (name === " " || name === undefined || name === null || name === "") {
    name = "Пользователь";
  }
  const response = await fetch(baseUrl, {
    method: "POST",
    body: JSON.stringify({ name, time }),
  });
  if (!response.ok) {
    throw new Error("Некорректные данные");
  } else {
    const responseData = await response.json();
    return responseData;
  }
}
