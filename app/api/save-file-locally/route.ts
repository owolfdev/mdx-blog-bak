import { NextResponse } from "next/server";
import { saveFileLocally } from "@/lib/save-file-locally";

export async function POST(req: Request) {
  if (req.method === "POST") {
    try {
      // Parse the request body
      const data = await req.json();

      console.log("Saving file locally with data:", data);

      // Call saveFileLocally with the parsed data
      console.log("Saving file locally with data:", data);
      saveFileLocally(data);

      return new Response(JSON.stringify("File saved successfully"), {
        headers: {
          "content-type": "application/json",
        },
      });
    } catch (error) {
      console.error("Error:", error);
      return new Response(
        JSON.stringify({
          message: "Error in processing your request",
        }),
        {
          status: 500,
          headers: {
            "content-type": "application/json",
          },
        }
      );
    }
  } else {
    // Handle any non-POST requests
    return new Response(
      JSON.stringify({
        message: "This endpoint only accepts POST requests",
      }),
      {
        headers: {
          "content-type": "application/json",
        },
      }
    );
  }
}
