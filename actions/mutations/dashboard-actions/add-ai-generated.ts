// import OpenAI from "openai";
// const client = new OpenAI();

// NOTE: This is a mock function. we cannot keep using the openai api because it not free.

export const addAiGenerated = async (task: string) => {
  //   const response = await client.responses.create({
  //     model: "gpt-4.1",
  //     instructions: "Talk like a professional leader in a web development agency.",
  //     input: "i have this task: " + task + "give me an estimated time to complete it and 2 advices to do it better the result should look like this : {time: 2, advices: ['advice1', 'advice2']}",
  //   });
  //   console.log(response.output_text);
  return {
    time: "2h",
    advices: ["be honest", "work hard"],
  };
};
