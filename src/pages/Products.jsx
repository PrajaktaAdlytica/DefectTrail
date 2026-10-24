import React from "react";
import { useParams } from "react-router-dom";
import {
  ArrowRight,
  CheckCircle,
  FileText,
  WarningCircle,
} from "@phosphor-icons/react";
import { products, productById } from "../data/content";
import {
  Art,
  Button,
  DemoBadge,
  Eyebrow,
  Meta,
  Notice,
  SectionHead,
  TextLink,
  usePageMotion,
} from "../lib";
import { PageHero } from "../components/Layout";
import {
  MiniArtifact,
  ProductSuite,
  SharedCase,
} from "../components/Marketing";
import { ProductScrollChapter } from "../components/ScrollChapters";
import { NotFound } from "./Editorial";

export function ProductsPage() {
  const ref = usePageMotion();
  return (
    <main id="main" ref={ref}>
      <Meta title="Five focused proposed modules" />
      <PageHero
        eyebrow="THE PROPOSED DEFECTTRAIL SUITE"
        title={
          <>
            Five distinct jobs.
            <br />
            One source-linked case.
          </>
        }
        description="Incident chronology, genealogy, comparison, suspect-scope review and CAPA evidence. Each offer has its own inputs, output and evaluation scope."
      >
        <div className="button-row">
          <Button to="/request-evaluation">Discuss a module evaluation</Button>
          <TextLink to="/demo">Explore the synthetic case</TextLink>
        </div>
        <p className="small muted">
          Proposed modules · Separately quotable · No active checkout
        </p>
      </PageHero>
      <ProductScrollChapter />
      <section className="container editorial-block">
        <SectionHead
          title="Choose a responsibility, not a bundle of tabs."
          description="The first pilot focuses on one line, one product family and one selected module. The five offers remain separate tests; shared case navigation does not make them one undifferentiated product."
        />
        <div className="editorial-columns">
          <div>
            <h3>What is shared</h3>
            <p>
              Source references, event times, missingness, analyst annotations,
              alternative explanations, the reviewer decision and a labeled
              export.
            </p>
          </div>
          <div>
            <h3>What is separately scoped</h3>
            <p>
              The job being evaluated, inputs, output artifact, service effort
              and the relevant per-case, per-line or per-site commercial
              hypothesis.
            </p>
          </div>
        </div>
      </section>
      <SharedCase />
    </main>
  );
}
export function ProductPage() {
  const { productId } = useParams();
  const p = productById[productId];
  const ref = usePageMotion();
  if (!p) return <NotFound />;
  return (
    <main id="main" ref={ref}>
      <Meta title={p.name + " — " + p.job} />
      <PageHero
        eyebrow={"PROPOSED MODULE " + p.number + " / " + p.eyebrow}
        title={p.headline}
        description={p.description}
        image={p.image}
      >
        <div className="button-row">
          <Button to={"/request-evaluation?module=" + p.id}>
            Evaluate {p.name}
          </Button>
          <TextLink to="/demo/cases/DT-103">Explore a synthetic case</TextLink>
        </div>
        <p className="product-hero-price">
          <strong>{p.price}</strong> {p.unit}
          <span>Indicative test hypothesis · not an active plan</span>
        </p>
      </PageHero>
      <section className="container module-mechanism section-space">
        <SectionHead
          eyebrow={p.name.toUpperCase() + " / THE OWNED WORKFLOW"}
          title="A concrete input. An inspectable output."
        />
        <div className="module-mechanism-grid">
          <div className="module-inputs">
            <h3>What comes in</h3>
            <ul className="check-list">
              {p.inputs.map((x) => (
                <li key={x}>
                  <FileText size={20} weight="light" />
                  {x}
                </li>
              ))}
            </ul>
            <p className="small muted">
              The isolated demo uses fictional sources only. Authorized
              real-data exports and production connectors are future work.
            </p>
          </div>
          <div className="module-artifact">
            <MiniArtifact type={p.icon} large />
            <TextLink to="/demo/cases/DT-103">
              Inspect the source-linked example
            </TextLink>
          </div>
        </div>
      </section>
      <section className="container module-process section-space">
        <div>
          <Eyebrow>HOW THE PROPOSED MODULE WORKS</Eyebrow>
          <h2>
            Keep the evidence
            <br />
            in the conversation.
          </h2>
          <Art
            name={p.id === "defect-review" ? "inspection-board" : p.image}
            alt={"Original illustrative " + p.name + " artifact"}
          />
        </div>
        <ol className="numbered-process">
          {p.steps.map((s, i) => (
            <li key={s}>
              <span>{String(i + 1).padStart(2, "0")}</span>
              <div>
                <h3>{s}</h3>
                <p>
                  {
                    [
                      "Sources retain their reference, locator and version.",
                      "Missingness and a later annotation stay distinct from the observation.",
                      "Counterexamples and alternatives remain available to the reviewer.",
                      "A local demonstration changes no source system or physical state.",
                    ][i]
                  }
                </p>
              </div>
            </li>
          ))}
        </ol>
      </section>
      <section className="module-output">
        <div className="container">
          <Eyebrow light>WHAT LEAVES THE REVIEW</Eyebrow>
          <h2>{p.output}</h2>
          <div className="output-boundary">
            <WarningCircle size={29} weight="light" />
            <p>{p.limit}</p>
          </div>
          <div className="button-row">
            <Button
              to={"/request-evaluation?module=" + p.id}
              className="button-light"
            >
              Discuss a {p.name} evaluation
            </Button>
            <TextLink to="/platform">See the shared platform</TextLink>
          </div>
        </div>
      </section>
      <section className="container product-commercial section-space">
        <div>
          <Eyebrow>COMMERCIAL TEST</Eyebrow>
          <h2>
            A defined scope,
            <br />
            before a commitment.
          </h2>
          <p className="section-description">
            {p.scope}:{" "}
            <strong>
              {p.price} {p.unit}
            </strong>
            . This is a test hypothesis for interviews and a conditional paid
            SOW, not a verified market rate or accepted current offer.
          </p>
          <p>
            Agree the relevant case, line or site definition, data-preparation
            effort, review ownership, services cost and comparison criteria. No
            savings, accuracy or performance guarantee is published.
          </p>
          <TextLink to="/pricing">Compare all five price hypotheses</TextLink>
        </div>
        <div className="product-faq">
          <h3>{p.faq}</h3>
          <p>{p.answer}</p>
          <Notice>
            Proceed beyond demo only after a quality lead signs the supervised
            paid pilot, legal approves the anonymized export, and the blinded
            comparison meets the agreed criteria.
          </Notice>
        </div>
      </section>
      <section className="container related-products">
        <Eyebrow>THE OTHER PROPOSED MODULES</Eyebrow>
        <div>
          {products
            .filter((x) => x.id !== p.id)
            .map((x) => (
              <TextLink to={"/products/" + x.id} key={x.id}>
                {x.name}
              </TextLink>
            ))}
        </div>
      </section>
    </main>
  );
}
