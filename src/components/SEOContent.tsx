import { Link } from "react-router-dom";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { FAQSchema, type FAQItem } from "@/components/FAQSchema";

const faqs: FAQItem[] = [
  {
    question: "Where can I find concerts in Copenhagen?",
    answer: "CPH Concerts lists every upcoming live music event in Copenhagen, including shows at Vega, Pumpehuset, DR Koncerthuset, Royal Arena, Amager Bio, Hotel Cecil, Rust, Loppen and more. The list is updated daily.",
  },
  {
    question: "What are the best concert venues in Copenhagen?",
    answer: "Copenhagen has a world-class live music scene. The most popular venues include Vega (indie & rock), DR Koncerthuset (classical & symphony), Royal Arena (large arena tours), Pumpehuset (alternative), Amager Bio, Loppen in Christiania, and Rust in Nørrebro.",
  },
  {
    question: "How do I buy tickets for Copenhagen concerts?",
    answer: "Click any concert card on CPH Concerts to be taken directly to the official ticket seller, usually Ticketmaster, Billetlugen or the venue's own box office. We never resell tickets — you always buy from the original source.",
  },
  {
    question: "Are there free concerts in Copenhagen?",
    answer: "Yes. Many bars, cafés and venues like Loppen, Hotel Cecil and Studenterhuset host free or pay-what-you-want gigs. Summer also brings free open-air concerts in parks like Kongens Have and Fælledparken.",
  },
  {
    question: "What concerts are on tonight in Copenhagen?",
    answer: "Use the date filter at the top of CPH Concerts to see what's happening tonight. You can filter by today, this weekend or any custom date range across all major Copenhagen venues.",
  },
  {
    question: "Does Copenhagen host major international tours?",
    answer: "Absolutely. Royal Arena and Parken regularly host major international artists. Recent and upcoming tours include world-class pop, rock, hip-hop and electronic acts from across Europe and the US.",
  },
  {
    question: "What is the biggest music festival in Copenhagen?",
    answer: "Copenhagen hosts several major festivals including Distortion (street parties), Copenhell (metal), Strøm (electronic), and the legendary Roskilde Festival just outside the city. Smaller festivals run year-round at venues across the city.",
  },
  {
    question: "Can I save concerts to a favourites list?",
    answer: "Yes. Tap the heart icon on any concert to save it. You can view your saved concerts on the Favourites page and we'll keep them organised by date.",
  },
];

const popularVenues = [
  "Vega", "Pumpehuset", "DR Koncerthuset", "Royal Arena",
  "Amager Bio", "Hotel Cecil", "Loppen", "Rust", "Stengade", "Studenterhuset",
];

export const SEOContent = () => {
  return (
    <>
      <FAQSchema faqs={faqs} />
      <section className="px-4 md:px-6 py-12 md:py-16 max-w-4xl mx-auto text-text-primary">
        <div className="space-y-8">
          <article>
            <h2 className="text-2xl md:text-3xl font-bold uppercase tracking-tight mb-4">
              Live Concerts in Copenhagen
            </h2>
            <p className="text-text-secondary leading-relaxed">
              Copenhagen is one of Europe's most exciting live music cities. From intimate
              jazz clubs in Christianshavn to world-class arena tours at Royal Arena,
              there's a concert happening every night of the week. CPH Concerts brings
              together every upcoming gig in the city — indie rock at Vega, classical
              symphonies at DR Koncerthuset, underground electronica at Culture Box,
              metal at Pumpehuset and everything in between.
            </p>
          </article>

          <article>
            <h2 className="text-2xl md:text-3xl font-bold uppercase tracking-tight mb-4">
              Top Music Venues in Copenhagen
            </h2>
            <p className="text-text-secondary leading-relaxed mb-4">
              Browse upcoming shows at Copenhagen's most loved venues. Each venue has its
              own character — from the legendary Vega complex on Vesterbro to the
              alternative spirit of Loppen in Christiania.
            </p>
            <div className="flex flex-wrap gap-2">
              {popularVenues.map((venue) => (
                <Link
                  key={venue}
                  to={`/venues/${venue.toLowerCase().replace(/\s+/g, "-")}`}
                  className="text-sm bg-ui-surface hover:bg-primary hover:text-primary-foreground border border-ui-border hover:border-primary px-3 py-1.5 rounded-xl transition-colors"
                >
                  Concerts at {venue}
                </Link>
              ))}
              <Link
                to="/venues"
                className="text-sm bg-primary text-primary-foreground hover:bg-primary/90 px-3 py-1.5 rounded-xl transition-colors"
              >
                See all venues →
              </Link>
            </div>
          </article>

          <article>
            <h2 className="text-2xl md:text-3xl font-bold uppercase tracking-tight mb-4">
              Frequently Asked Questions
            </h2>
            <Accordion type="single" collapsible className="w-full">
              {faqs.map((faq, i) => (
                <AccordionItem key={i} value={`item-${i}`}>
                  <AccordionTrigger className="text-left">{faq.question}</AccordionTrigger>
                  <AccordionContent className="text-text-secondary">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </article>
        </div>
      </section>
    </>
  );
};
