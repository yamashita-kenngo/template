import { Card, CardContent } from "@/components/ui/card";

export function HelloWorld() {
	return (
		<Card className="w-[300px]">
			<CardContent className="pt-6">
				<h1 className="text-2xl font-bold text-center text-primary">
					Hello World !
				</h1>
			</CardContent>
		</Card>
	);
}
