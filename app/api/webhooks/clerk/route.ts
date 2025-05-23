import { Webhook } from "svix";
import { headers } from "next/headers";
import { WebhookEvent } from "@clerk/nextjs/server";
import { db } from "@/lib/db";
import { clerkClient } from "@clerk/nextjs";

export async function POST(req: Request) {
  // You can find this in the Clerk Dashboard -> Webhooks -> choose the webhook
  const WEBHOOK_SECRET = process.env.CLERK_WEBHOOK_SECRET;

  if (!WEBHOOK_SECRET) {
    throw new Error(
      "Please add CLERK_WEBHOOK_SECRET from Clerk Dashboard to .env or .env.local"
    );
  }

  // Get the headers
  const headerPayload = headers();
  const svix_id = headerPayload.get("svix-id");
  const svix_timestamp = headerPayload.get("svix-timestamp");
  const svix_signature = headerPayload.get("svix-signature");

  // If there are no headers, error out
  if (!svix_id || !svix_timestamp || !svix_signature) {
    return new Response("Error occured -- no svix headers", {
      status: 400,
    });
  }

  // Get the body
  const payload = await req.json();
  const body = JSON.stringify(payload);

  // Create a new Svix instance with your secret.
  const wh = new Webhook(WEBHOOK_SECRET);

  let evt: WebhookEvent;

  // Verify the payload with the headers
  try {
    evt = wh.verify(body, {
      "svix-id": svix_id,
      "svix-timestamp": svix_timestamp,
      "svix-signature": svix_signature,
    }) as WebhookEvent;
  } catch (err) {
    console.error("Error verifying webhook:", err);
    return new Response("Error occured", {
      status: 400,
    });
  }

  // Get the ID and type
  const { id } = evt.data;
  const eventType = evt.type;

  if (eventType === "user.created") {
    /*await setTimeout(() => {}, 1); //some weird behavior happens if you delete this line trust me
    const invitations = await clerkClient.invitations.getInvitationList();
    
    for(let i=0;i<invitations.length;i++) {
      if(invitations[i].emailAddress === payload.data.email_addresses[0].email_address) {
        await clerkClient.invitations.revokeInvitation(
          invitations[i].id
        );
      }
    }*/

    await db.user.update({
      where: {
        email: payload.data.email_addresses[0].email_address,
      },
      data: {
        username: payload.data.username,
        imageUrl: payload.data.image_url,
        firstName: payload.data.first_name,
        lastName: payload.data.last_name,
        clerkUserId: payload.data.id,
        phoneNumber: payload.data.phone_numbers[0].phone_number,
      },
    });
  }

  if (eventType === "user.updated") {
    await db.user.update({
      where: {
        clerkUserId: payload.data.id,
      },
      data: {
        username: payload.data.username,
        imageUrl: payload.data.image_url,
        firstName: payload.data.first_name,
        lastName: payload.data.last_name,
        phoneNumber: payload.data.phone_numbers[0].phone_number,
      },
    });
  }

  if (eventType === "user.deleted") {
    await db.user.delete({
      where: {
        clerkUserId: payload.data.id,
      },
    });
  }

  return new Response("", { status: 200 });
}
