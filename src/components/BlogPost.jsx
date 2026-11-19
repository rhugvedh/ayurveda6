import { Fragment } from 'react';
import Head from 'next/head';
import Image from 'next/image';
import NextLink from 'components/NextLink';
import CtaBanner from 'components/CtaBanner';
import FaqAccordion from 'components/FaqAccordion';
import BlogText from 'components/BlogText';
import { whatsappLink } from 'data/contact';
import { blogPosts } from 'data/blog';

const SITE = 'https://ayurmantrapanchkarma.com';

const BlogPost = ({ slug }) => {
  const post = blogPosts.find((p) => p.slug === slug);
  if (!post) return null;

  const {
    seoTitle,
    metaDesc,
    h1,
    breadcrumb,
    byline,
    intro,
    takeaway,
    toc,
    sections,
    faqs,
    conclusion,
    closing,
    disclaimer,
  } = post;
  const slugify = (s) =>
    s
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-|-$/g, '');
  const canonical = `${SITE}/blog/${slug}/`;

  const faqItems = faqs.map(({ q, a }) => ({
    title: q,
    content: [{ type: 'para', text: a }],
  }));

  const faqJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map(({ q, a }) => ({
      '@type': 'Question',
      name: q,
      acceptedAnswer: { '@type': 'Answer', text: a },
    })),
  };

  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: `${SITE}/` },
      { '@type': 'ListItem', position: 2, name: 'Blog', item: `${SITE}/blog/` },
      { '@type': 'ListItem', position: 3, name: h1, item: canonical },
    ],
  };

  return (
    <Fragment>
      <Head>
        <title>{seoTitle}</title>
        <meta name="description" content={metaDesc} />
        <link rel="canonical" href={canonical} />
        <meta property="og:type" content="article" />
        <meta property="og:title" content={seoTitle} />
        <meta property="og:description" content={metaDesc} />
        <meta property="og:url" content={canonical} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
        />
      </Head>

      <main className="content-wrapper overflow-hidden">
        {/* ================= Page Header / Banner ================= */}
        <section className="wrapper bg-dark">
          <div className="container py-8 py-md-10">
            <nav aria-label="breadcrumb">
              <ol className="breadcrumb text-white mb-4">
                <li className="breadcrumb-item">
                  <NextLink href="/" title="Home" />
                </li>
                <li className="breadcrumb-item">
                  <NextLink href="/blog/" title="Blog" />
                </li>
                <li className="breadcrumb-item active" aria-current="page">
                  <span>{breadcrumb || h1}</span>
                </li>
              </ol>
            </nav>
            <h1 className="merriweather fs-38 fs-md-46 text-white mb-3" style={{ maxWidth: '900px' }}>
              {h1}
            </h1>
          </div>
        </section>

        {/* ================= Article ================= */}
        <section className="wrapper">
          <div className="container py-10 py-md-12">
            <div className="row">
              <div className="col-lg-9 mx-auto">
                {byline && (
                  <div className="mb-5">
                    {byline.map((line) => (
                      <p key={line} className="fs-16 lato fw-bold mb-1">
                        {line}
                      </p>
                    ))}
                  </div>
                )}

                {intro.map((text, i) => (
                  <p key={i} className="fs-18 lh-lg lato text-justify mb-4">
                    <BlogText text={text} />
                  </p>
                ))}

                {takeaway && (
                  <div className="mt-6 mb-5">
                    <h2 className="fs-28 merriweather text-second mb-3">{takeaway.title}</h2>
                    <ul className="icon-list bullet-soft-primary mb-5">
                      {takeaway.items.map((item) => (
                        <li key={item} className="fs-17 lato mb-2">
                          <i className="uil uil-check" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {toc && (
                  <div className="mb-5">
                    <h2 className="fs-28 merriweather text-second mb-3">Table of Contents</h2>
                    <ul className="fs-17 lato">
                      {sections.map((s) => (
                        <li key={s.title} className="mb-1">
                          <a href={`#${slugify(s.title)}`} className="text-color">
                            {s.title}
                          </a>
                        </li>
                      ))}
                      <li className="mb-1">
                        <a href="#faq" className="text-color">
                          Frequently Asked Questions
                        </a>
                      </li>
                    </ul>
                  </div>
                )}

                {sections.map((section) => (
                  <div key={section.title}>
                    <h2
                      id={slugify(section.title)}
                      className="fs-28 merriweather text-second mt-8 mb-3"
                      style={{ scrollMarginTop: 120 }}
                    >
                      {section.title}
                    </h2>
                    {section.blocks.map((b, i) => {
                      if (b.t === 'h3') {
                        return (
                          <h3 key={i} className="fs-22 merriweather text-second mt-6 mb-3">
                            {b.text}
                          </h3>
                        );
                      }
                      if (b.t === 'img') {
                        return (
                          <figure key={i} className="my-6">
                            <Image
                              src={b.src}
                              width={b.width}
                              height={b.height}
                              alt={b.alt}
                              className="rounded shadow-lg"
                              style={{ width: '100%', height: 'auto' }}
                              loading="lazy"
                            />
                          </figure>
                        );
                      }
                      if (b.t === 'ul') {
                        return (
                          <ul key={i} className="icon-list bullet-soft-primary mb-5">
                            {b.items.map((item) => (
                              <li key={item} className="fs-17 lato mb-2">
                                <i className="uil uil-check" />
                                {item}
                              </li>
                            ))}
                          </ul>
                        );
                      }
                      if (b.t === 'table') {
                        return (
                          <div key={i} className="table-responsive mb-5">
                            <table className="table table-bordered lato fs-16">
                              <thead>
                                <tr>
                                  {b.head.map((h) => (
                                    <th key={h}>{h}</th>
                                  ))}
                                </tr>
                              </thead>
                              <tbody>
                                {b.rows.map((row, r) => (
                                  <tr key={r}>
                                    {row.map((cell, c) => (
                                      <td key={c}>{cell}</td>
                                    ))}
                                  </tr>
                                ))}
                              </tbody>
                            </table>
                          </div>
                        );
                      }
                      return (
                        <p key={i} className="mb-4 fs-17 lh-lg lato text-justify">
                          <BlogText text={b.text} />
                        </p>
                      );
                    })}
                  </div>
                ))}

                {/* ================= FAQ ================= */}
                <div id="faq" style={{ scrollMarginTop: 120 }}>
                  <FaqAccordion title="Frequently Asked Questions" items={faqItems} idPrefix={slug} />
                </div>

                {/* ================= Conclusion ================= */}
                <div className="mt-8">
                  <h2 className="fs-28 merriweather text-second mb-3">{conclusion.title}</h2>
                  {conclusion.paras.map((text, i) => (
                    <p key={i} className="mb-4 fs-17 lh-lg lato text-justify">
                      <BlogText text={text} />
                    </p>
                  ))}
                </div>

                {closing && (
                  <div className="mt-8">
                    <h2 className="fs-28 merriweather text-second mb-3">{closing.title}</h2>
                    {closing.paras.map((text, i) => (
                      <p key={i} className="mb-4 fs-17 lh-lg lato text-justify">
                        <BlogText text={text} />
                      </p>
                    ))}
                  </div>
                )}

                {disclaimer && (
                  <div className="mt-8">
                    <h2 className="fs-22 merriweather text-second mb-3">{disclaimer.title}</h2>
                    <p className="mb-4 fs-15 lh-lg lato text-justify">{disclaimer.text}</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* ================= CTA ================= */}
        <section className="wrapper">
          <div className="container py-10 pb-md-16">
            <CtaBanner
              eyebrow="Book a Consultation"
              heading="Speak with Dr. Rohini Jedhe"
              subtext="Your health concerns deserve personalised attention."
              buttonText="Book on WhatsApp"
              href={whatsappLink()}
            />
          </div>
        </section>
      </main>
    </Fragment>
  );
};

export default BlogPost;
