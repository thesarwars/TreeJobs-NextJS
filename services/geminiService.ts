export const enhanceJobDescription = async (title: string, rawDescription: string) => {
  try {
    const res = await fetch("/api/gemini", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ action: "enhanceJobDescription", title, rawDescription }),
    });

    if (!res.ok) {
      console.error("Gemini enhanceJobDescription failed", await res.text());
      return rawDescription;
    }

    const data = (await res.json()) as { text?: string };
    return data.text ?? rawDescription;
  } catch (error) {
    console.error("AI enhancement failed", error);
    return rawDescription;
  }
};

export const suggestArboristMessage = async (jobTitle: string, jobDesc: string) => {
  try {
    const res = await fetch("/api/gemini", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ action: "suggestArboristMessage", jobTitle, jobDesc }),
    });

    if (!res.ok) {
      console.error("Gemini suggestArboristMessage failed", await res.text());
      return "Hi, I'm interested in this job and would like to learn more.";
    }

    const data = (await res.json()) as { text?: string };
    return data.text ?? "Hi, I'm interested in this job and would like to learn more.";
  } catch (error) {
    console.error("AI suggestion failed", error);
    return "Hi, I'm interested in this job and would like to learn more.";
  }
};
