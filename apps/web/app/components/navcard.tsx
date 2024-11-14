import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
  } from "@repo/ui/components/ui/card"
import Link from "next/link";

export const NavCard = ({ title, description, href }: { title: string; description: string; href: string }) => {
    return (
        <Card className="hover:bg-gray-200 hover:border hover:border-gray-800">
            <Link href={href} >
            <CardHeader>
                <CardTitle>{title}</CardTitle>
            </CardHeader>
            <CardContent>
                <CardDescription>{description}</CardDescription>
            </CardContent>
            </Link>
        </Card>
    )
};