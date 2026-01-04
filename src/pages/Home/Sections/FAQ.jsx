import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { HiChevronDown } from "react-icons/hi";

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const faqs = [
    {
      question: "How do I book a car?",
      answer:
        "Browse our available cars, select your preferred vehicle, choose your rental dates, and complete the booking process. You'll receive instant confirmation via email.",
    },
    {
      question: "What documents do I need to rent a car?",
      answer:
        "You'll need a valid driver's license, a government-issued ID, and a credit card in your name. International customers may need an international driving permit.",
    },
    {
      question: "Can I modify or cancel my booking?",
      answer:
        "Yes! You can modify or cancel your booking from your dashboard. Cancellation policies vary depending on how far in advance you cancel. Check our terms for details.",
    },
    {
      question: "What is included in the rental price?",
      answer:
        "The rental price includes basic insurance, unlimited mileage within the rental area, and 24/7 roadside assistance. Additional coverage and services are available at extra cost.",
    },
    {
      question: "Is there a minimum age requirement?",
      answer:
        "Yes, renters must be at least 21 years old. Drivers under 25 may be subject to additional fees. Premium and luxury vehicles may require drivers to be 25 or older.",
    },
    {
      question: "What payment methods do you accept?",
      answer:
        "We accept all major credit cards (Visa, MasterCard, American Express), debit cards, and digital payment methods. Cash deposits may be required for certain vehicle categories.",
    },
    {
      question: "Can I extend my rental period?",
      answer:
        "Yes, you can extend your rental if the car is available. Contact us or update your booking through your dashboard. Additional charges will apply for the extended period.",
    },
    {
      question: "What happens if the car breaks down?",
      answer:
        "All rentals include 24/7 roadside assistance. Contact our support team immediately, and we'll arrange repairs or provide a replacement vehicle at no additional cost.",
    },
  ];

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="py-16 md:py-20 lg:py-24 bg-base-100">
      <div className="max-w-5xl mx-auto px-6 lg:px-10">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12 lg:mb-16"
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold text-neutral mb-4">
            Frequently Asked <span className="text-primary">Questions</span>
          </h2>
          <p className="text-base md:text-lg lg:text-xl text-neutral-medium font-body max-w-2xl mx-auto">
            Find answers to common questions about our car rental service
          </p>
        </motion.div>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.05 }}
              className="bg-base-100 rounded-xl shadow-lg border-2 border-base-300 overflow-hidden hover:shadow-xl transition-shadow duration-300"
            >
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full text-left p-6 md:p-8 flex items-center justify-between gap-4 hover:bg-base-200 transition-colors duration-200"
              >
                <h3 className="text-base md:text-lg lg:text-xl font-heading font-semibold text-neutral pr-4">
                  {faq.question}
                </h3>
                <motion.div
                  animate={{ rotate: openIndex === index ? 180 : 0 }}
                  transition={{ duration: 0.3 }}
                  className="shrink-0"
                >
                  <HiChevronDown className="text-2xl md:text-3xl text-primary" />
                </motion.div>
              </button>

              <AnimatePresence>
                {openIndex === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <div className="px-6 md:px-8 pb-6 md:pb-8 pt-0">
                      <p className="text-sm md:text-base lg:text-lg text-neutral-medium font-body leading-relaxed">
                        {faq.answer}
                      </p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="text-center mt-12 lg:mt-16"
        >
          <p className="text-base md:text-lg text-neutral-medium font-body mb-4">
            Still have questions?
          </p>
          <a
            href="mailto:support@rentwheels.com"
            className="text-primary hover:text-primary-dark font-body font-semibold text-lg underline transition-colors duration-200"
          >
            Contact our support team
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default FAQ;
