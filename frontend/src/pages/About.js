import React from "react";
import Layout from "../components/BasicLayout/Layout";

const About = () => {
  return (
    <Layout title={"About Us - plantstore app"}>
      <div className="row contactus">
        <h1 className="bg-success p2 text-white text-center">About US</h1>
        <div className="m-2" style={{ border: "1px solid, black" }}>
          <img
            src="./images/contact.jpg"
            alt="contact"
            style={{ width: "100%" }}
          />
        </div>
        <div className="m-2" style={{ border: "1px solid, black" }}>
          <p>
            We nurture our plants so they can nurture your soul. From our
            greenhouses - spread over 25 acres - to your gardens,{" "}
            <span>we plant seeds of peace and serenity in plant form.</span>
            Welcome to our green haven, where a passion for plants meets a
            commitment to add rare varieties of plants to our collection. We are
            not just an online plant nursery; we are cultivators of dreams,
            architects of thriving ecosystems, and enthusiasts of the botanical
            tapestry that transforms spaces into living, breathing sanctuaries.
          </p>
          <p>
            Our Roots: Nestled in the heart of Gurgaon, Haryana, our journey
            began with a simple yet profound love for plants. What started as a
            seed of an idea has now blossomed into a lush oasis of over 250
            plant species. We are more than just purveyors of greenery; we are
            storytellers, weaving tales of growth, resilience, and the enduring
            beauty of nature.
          </p>
          <p>
            Diverse Flora, One Family: From the vibrant hues of flowering plants
            to the stoic elegance of indoor foliage, the hardy resilience of
            outdoor greens to the charming allure of succulents, and the thrill
            of discovering rare botanical gems—our plant family is as diverse as
            the stories each leaf tells. We believe that every plant has a
            unique personality, and it's our pleasure to introduce you to the
            perfect leafy companions for your home or garden.
          </p>
          <p>
            A Symphony of Sustainability: At our nursery, sustainability is not
            just a buzzword; it's a way of life. We take pride in nurturing our
            plants with care, utilizing eco-friendly practices, and promoting a
            greener lifestyle. Each plant you bring into your space is a step
            towards a more sustainable and harmonious relationship with the
            environment.
          </p>
          <p>
            Growing with You: Our mission goes beyond providing plants; we are
            here to cultivate a community of plant enthusiasts. Whether you're a
            seasoned gardener or a budding green thumb, we're here to support
            your journey. Our team of plant enthusiasts and experts is always
            ready to share tips, answer questions, and celebrate every new leaf
            and bud that unfurls in your care.
          </p>
          <p>
            The Green Promise: When you choose plants from our nursery, you're
            not just acquiring botanical treasures; you're investing in a
            promise of quality, authenticity, and a shared love for all things
            green. Each plant is a testament to our dedication to delivering not
            just products but experiences that nurture your connection with
            nature.
          </p>
          <p>
            Join Us in Cultivating Green Dreams: As you explore our collection
            of plants, envision the possibilities, and let the magic of greenery
            transform your surroundings. We invite you to embark on a journey
            with us, where every leaf is a chapter, and every plant is a story
            waiting to be written. Thank you for choosing us as your botanical
            companions on this green adventure. Let's cultivate dreams, one
            plant at a time.
          </p>
        </div>
      </div>
    </Layout>
  );
};

export default About;
