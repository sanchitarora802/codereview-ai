import Link from "next/link";
import Button from "@/components/shared/Button";

export default function CTASection() {
  return (
    <section className="bg-gradient-to-r from-blue-600 to-purple-600 py-20">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
          Ready to Write Better Code?
        </h2>
        <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
          Join thousands of developers who are shipping higher quality code with
          confidence
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/dashboard">
            <Button
              variant="secondary"
              size="large"
              className="bg-white text-blue-600 hover:bg-gray-100"
            >
              Start Your Free Trial
            </Button>
          </Link>
          <Link href="/#pricing">
            <Button
              variant="outline"
              size="large"
              className="text-white border-white hover:bg-white/10"
            >
              View Pricing Plans
            </Button>
          </Link>
        </div>

        <div className="mt-12 flex items-center justify-center gap-8 text-white/80">
          <div className="text-center">
            <div className="text-3xl font-bold text-white">10K+</div>
            <div className="text-sm">Active Users</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-white">500K+</div>
            <div className="text-sm">Code Reviews</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-white">4.9/5</div>
            <div className="text-sm">User Rating</div>
          </div>
        </div>
      </div>
    </section>
  );
}
