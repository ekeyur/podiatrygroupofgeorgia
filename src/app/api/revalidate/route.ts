import { revalidatePath, revalidateTag } from "next/cache";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const secret = req.nextUrl.searchParams.get("secret");

  if (secret !== process.env.REVALIDATION_SECRET) {
    return NextResponse.json({ message: "Invalid secret" }, { status: 401 });
  }

  try {
    const body = await req.json();
    const { post_type, slug } = body;

    switch (post_type) {
      case "product":
        revalidateTag("products", "default");
        revalidatePath("/shop");
        if (slug) revalidatePath(`/shop/${slug}`);
        break;
      case "service":
        revalidateTag("services", "default");
        revalidatePath("/services");
        if (slug) revalidatePath(`/services/${slug}`);
        break;
      case "team_member":
        revalidateTag("team", "default");
        revalidatePath("/team");
        if (slug) revalidatePath(`/team/${slug}`);
        break;
      case "testimonial":
        revalidateTag("testimonials", "default");
        revalidatePath("/testimonials");
        break;
      case "post":
        revalidateTag("posts", "default");
        revalidatePath("/blog");
        if (slug) revalidatePath(`/blog/${slug}`);
        break;
      default:
        revalidateTag("homepage", "default");
        revalidatePath("/");
    }

    // Always revalidate homepage since it pulls from multiple sources
    revalidateTag("homepage", "default");
    revalidatePath("/");

    return NextResponse.json({ revalidated: true, post_type, slug });
  } catch (err) {
    return NextResponse.json(
      { message: "Error revalidating", error: String(err) },
      { status: 500 }
    );
  }
}
