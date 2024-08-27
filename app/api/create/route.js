import { NextResponse } from "next/server";
import { Client, Databases, ID } from "appwrite";

const client = new Client();

client
  .setEndpoint("https://cloud.appwrite.io/v1")
  .setProject("66cdc755002f57414bbc");

const databases = new Databases(client);

export async function POST(request) {
  try {
    const { Matric_Number, Full_Name, NIN, Passport } = await request.json();

    const response = await databases.createDocument(
      "66cdcc8e0013cb4db348", // Database ID
      "66cdcc9b001276ac3ebc", // Collection ID
      ID.unique(),
      {
        Matric_Number,
        Full_Name,
        NIN,
        Passport,
      }
    );

    return NextResponse.json(
      { message: "Document Created", data: response },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error creating document:", error);
    return NextResponse.json(
      { error: "Failed to create document" },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    const response = await databases.listDocuments(
      "66cdcc8e0013cb4db348",
      "66cdcc9b001276ac3ebc"
    );

    return NextResponse.json(
      { message: "Documents retrieved successfully", data: response.documents },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error retrieving documents:", error);
    return NextResponse.json(
      { error: "Failed to retrieve documents" },
      { status: 500 }
    );
  }
}
