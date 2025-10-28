import { CheckCircle, Clock, BarChart3 } from "lucide-react";

const Features = () => {
	const features = [
		{
			id: 1,
			icon: (
				<CheckCircle className="text-blue-600 w-8 h-8" aria-hidden="true" />
			),
			title: "Easy Ticketing",
			description:
				"Create, assign, and manage tickets effortlessly with intuitive forms and real-time updates.",
		},
		{
			id: 2,
			icon: <Clock className="text-blue-600 w-8 h-8" aria-hidden="true" />,
			title: "Real-Time Tracking",
			description:
				"Monitor open, in-progress, and closed tickets at a glance using your dashboard summary cards.",
		},
		{
			id: 3,
			icon: <BarChart3 className="text-blue-600 w-8 h-8" aria-hidden="true" />,
			title: "Insightful Dashboard",
			description:
				"Gain quick insights into your workflow with stats and visual summaries of all ticket statuses.",
		},
	];

	return (
		<section
			id="features"
			className="bg-white pb-20 text-center mx-auto"
			aria-labelledby="features-heading"
		>
			<div className="mx-auto">
				{/* Heading */}
				<h2
					id="features-heading"
					className="text-3xl md:text-4xl font-extrabold text-gray-800 mb-1"
				>
					Create. Track. Resolve.
				</h2>
				<p className="text-gray-600 max-w-2xl mx-auto mb-12">
					A smarter way to handle tickets from start to finish — all in one
					intuitive dashboard.
				</p>

				{/* Features Grid */}
				<div className="grid gap-8 md:grid-cols-3 max-w-[1200px] mx-auto">
					{features.map((feature) => (
						<div
							key={feature.id}
							className="bg-linear-to-br from-blue-50 to-blue-100 rounded-2xl shadow-md hover:shadow-lg transition p-8 flex flex-col items-center text-center focus-within:ring-2 focus-within:ring-blue-400"
							tabIndex="0"
							role="article"
							aria-label={feature.title}
						>
							<div className="mb-4">{feature.icon}</div>
							<h3 className="text-xl font-semibold text-gray-800 mb-2">
								{feature.title}
							</h3>
							<p className="text-gray-600 text-base leading-relaxed">
								{feature.description}
							</p>
						</div>
					))}
				</div>
			</div>
		</section>
	);
};

export default Features;
