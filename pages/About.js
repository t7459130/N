import Layout from '../components/Layout';

export default function About() {
  return (
    <Layout>
      <div style={{ maxWidth: '900px', margin: '0 auto', padding: '2rem' }}>
        <h1>About Us</h1>
        <img
          src="/images/carwallpaper6.jpg"
          alt="About us banner"
          style={{
            width: '100%',
            height: 'auto',
            borderRadius: '8px',
            marginBottom: '1.5rem',
          }}
        />
        <p style={{ fontSize: '1.1rem', lineHeight: '1.8' }}>
          Hello, and welcome to our dealership. My name is Nabil, and I'm a 28-year-old luxury car
          enthusiast and founder of Surrey Supercars. Cars aren’t just my business — they’re my
          life.
        </p>

        <p style={{ fontSize: '1.1rem', lineHeight: '1.8' }}>
          I was born into a family where cars were more than just a mode of transport. My earliest
          memories are of V12 engines roaring to life, the scent of fine leather interiors, and
          weekends spent at track days with my father. By the time I could walk, I could tell the
          difference between a Ferrari and a Lamborghini by the shape of their headlights. It wasn’t
          just an obsession — it was my environment.
        </p>

        <p style={{ fontSize: '1.1rem', lineHeight: '1.8' }}>
          Over the years, that passion evolved into a deep understanding of the automotive industry,
          particularly in the world of supercars, exotics, and collector vehicles. I’ve worked with
          some of the rarest and most prestigious machines ever made — from limited-run Bugattis to
          one-off McLarens, pristine Rolls-Royces to modern hypercars. My commitment is to not only
          source the finest luxury vehicles, but to offer an ownership experience that matches the
          exclusivity of the cars themselves.
        </p>

        <p style={{ fontSize: '1.1rem', lineHeight: '1.8' }}>
          At Surrey Supercars, we pride ourselves on delivering a bespoke, client-focused experience.
          Whether you’re looking to purchase, sell, or source a particular vehicle, our goal is to
          make the process seamless and enjoyable. Every car we list is hand-picked, inspected, and
          vetted to meet the highest standards — because I believe our clients deserve nothing less.
        </p>

        <p style={{ fontSize: '1.1rem', lineHeight: '1.8' }}>
          If you’re in the market for something special — or just want to talk cars — I invite you
          to get in touch. This isn’t just a business. It’s a lifestyle built on speed, style, and
          the sheer joy of automotive excellence.
        </p>

        <p style={{ fontSize: '1.1rem', lineHeight: '1.8', fontStyle: 'italic', marginTop: '2rem' }}>
          "Some sell cars. I share passion on four wheels." – Nabil
        </p>
      </div>
    </Layout>
  );
}
