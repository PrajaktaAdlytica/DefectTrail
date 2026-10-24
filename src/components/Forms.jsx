import React, { useEffect, useRef, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import {
  CheckCircle,
  Copy,
  ArrowLeft,
  Info,
  WarningCircle,
  FileText,
} from "@phosphor-icons/react";
import { products } from "../data/content";
import { Button, Notice, TextLink, usePreferences } from "../lib";
import { downloadFile } from "../data/demo";

function Field({ label, name, children, help, required = false, ...props }) {
  return (
    <label className="field">
      <span>
        {label}
        {required && <span aria-hidden="true"> *</span>}
      </span>
      {children || <input name={name} required={required} {...props} />}{" "}
      {help && <small>{help}</small>}
    </label>
  );
}
export function InquiryForm({ kind = "evaluation", compact = false }) {
  const [params] = useSearchParams();
  const form = useRef();
  const [step, setStep] = useState(1);
  const [summary, setSummary] = useState(null);
  const [copied, setCopied] = useState(false);
  const [started, setStarted] = useState(false);
  const { track } = usePreferences();
  const module = params.get("module") || "";
  const isContact = kind === "contact";
  const isWaitlist = kind === "waitlist";
  const isDemo = kind === "demo";
  const full = !compact && !isContact && !isWaitlist && !isDemo;
  const label = isContact
    ? "Review inquiry"
    : isWaitlist
      ? "Review research interest"
      : isDemo
        ? "Review walkthrough request"
        : "Review evaluation inquiry";
  const collect = () =>
    Object.fromEntries(
      [...new FormData(form.current)].map(([k, v]) => [
        k,
        typeof v === "string" ? v.trim() : v,
      ]),
    );
  const next = (e) => {
    e.preventDefault();
    if (!form.current.reportValidity()) return;
    const data = collect();
    if (full && step < 3) {
      setSummary(data);
      setStep((s) => s + 1);
      requestAnimationFrame(() =>
        form.current
          .querySelector(
            ".form-grid:not([hidden]) input,.form-grid:not([hidden]) select,.consent-area:not([hidden]) input",
          )
          ?.focus(),
      );
    } else {
      setSummary({
        ...summary,
        ...data,
        followUp: Boolean(form.current.elements.followUp?.checked),
        marketing: Boolean(form.current.elements.marketing?.checked),
      });
      setStep(4);
      requestAnimationFrame(() =>
        document.getElementById("inquiry-summary")?.focus(),
      );
    }
  };
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(JSON.stringify(summary, null, 2));
      setCopied(true);
    } catch {
      setCopied(false);
    }
  };
  if (step === 4)
    return (
      <div className="inquiry-result" id="inquiry-summary" tabIndex="-1">
        <span className="result-icon">
          <FileText size={28} weight="light" />
        </span>
        <p className="eyebrow">LOCAL REVIEW ONLY</p>
        <h3>Your inquiry is ready to review.</h3>
        <p>
          Nothing has been sent. This preview has no connected lead service,
          calendar or email delivery.
        </p>
        <dl className="inquiry-summary">
          {Object.entries(summary || {})
            .filter(([k]) => !["marketing", "followUp"].includes(k))
            .map(([key, value]) => (
              <React.Fragment key={key}>
                <dt>
                  {{
                    email: "Work email",
                    organization: "Organization",
                    role: "Role",
                    module: "Module",
                    timeframe: "Pilot timeframe",
                    workflow: "Current workflow",
                    sector: "Sector",
                    sites: "Site count",
                    line: "Line / family",
                    budgetOwner: "Budget owner",
                    operator: "Named operator",
                    dataOwner: "Data owner",
                    grader: "Quality-lead grader",
                    historicalCases: "Three closed incidents",
                    permission: "Export permission",
                    legal: "Procurement / legal",
                    paid: "Paid scope",
                    inquiryType: "Inquiry type",
                    message: "Business context",
                  }[key] || key}
                </dt>
                <dd>
                  {String(
                    (key === "module"
                      ? products.find((product) => product.id === value)
                          ?.name || value
                      : value) || "Not provided",
                  )}
                </dd>
              </React.Fragment>
            ))}
        </dl>
        <p className="small">
          Follow-up choice:{" "}
          {summary?.followUp ? "Yes, for this inquiry" : "Not selected"}.
          Research updates: {summary?.marketing ? "Selected" : "Not selected"}.
        </p>
        <div className="button-row">
          <Button onClick={copy}>
            {copied ? "Summary copied" : "Copy local summary"}
          </Button>
          <button
            className="text-link"
            onClick={() => {
              setStep(full ? 3 : 1);
              setCopied(false);
            }}
          >
            <ArrowLeft size={16} />
            Edit entries
          </button>
        </div>
        <button
          className="text-link small"
          onClick={() => {
            setSummary(null);
            setStep(1);
            setStarted(false);
          }}
        >
          Clear this local inquiry
        </button>
        <Notice>
          Real-data requests require a separate human security/legal review. Do
          not place production data in this summary.
        </Notice>
      </div>
    );
  return (
    <form
      className={"inquiry-form " + (compact ? "compact" : "")}
      ref={form}
      onSubmit={next}
      onFocus={() => {
        if (!started) {
          setStarted(true);
          track("form_start", { formId: kind });
        }
      }}
    >
      {full && (
        <ol className="form-steps" aria-label="Inquiry progress">
          {["Fit", "People & readiness", "Consent & review"].map((x, i) => (
            <li
              key={x}
              className={step === i + 1 ? "active" : step > i + 1 ? "done" : ""}
            >
              <span>{step > i + 1 ? <CheckCircle size={16} /> : i + 1}</span>
              {x}
            </li>
          ))}
        </ol>
      )}
      <Notice>
        Business context only. Do not include production records, proprietary
        images or personal records.
      </Notice>
      <div hidden={full && step !== 1} className="form-grid">
        <Field
          label="Work email"
          name="email"
          type="email"
          autoComplete="email"
          placeholder="you@company.com"
          required
          defaultValue={summary?.email}
        />
        <Field
          label="Organization"
          name="organization"
          autoComplete="organization"
          placeholder="Your organization"
          required
          defaultValue={summary?.organization}
        />
        <Field label="Role" name="role" required>
          <select name="role" required defaultValue={summary?.role || ""}>
            <option value="" disabled>
              Select your role
            </option>
            <option>Quality director</option>
            <option>Manufacturing engineering lead</option>
            <option>Day-to-day operator</option>
            <option>Data / integration owner</option>
            <option>Supplier-quality leader</option>
            <option>Other role</option>
          </select>
        </Field>
        <Field
          label={isWaitlist ? "Research / pilot timeframe" : "Pilot timeframe"}
          name="timeframe"
          required
        >
          <select
            name="timeframe"
            defaultValue={summary?.timeframe || ""}
            required
          >
            <option value="" disabled>
              Select timeframe
            </option>
            <option>Exploring fit</option>
            <option>Within 3 months</option>
            <option>3–6 months</option>
            <option>Later / not yet known</option>
          </select>
        </Field>
        {!isContact && (
          <Field label="Module of interest" name="module" required>
            <select
              name="module"
              required
              defaultValue={summary?.module || module}
            >
              <option value="" disabled>
                Choose a proposed module
              </option>
              {products.map((p) => (
                <option value={p.id} key={p.id}>
                  {p.name} — {p.scope}
                </option>
              ))}
              {isDemo && (
                <option value="suite">Overview of the proposed suite</option>
              )}
            </select>
            <small>
              Five distinct scopes. One selected module for the first pilot.
            </small>
          </Field>
        )}
        {(full || isWaitlist) && (
          <>
            <Field label="Sector" name="sector" required>
              <select
                name="sector"
                required
                defaultValue={summary?.sector || ""}
              >
                <option value="" disabled>
                  Select manufacturing context
                </option>
                <option>Electronics manufacturing</option>
                <option>Discrete assembly</option>
                <option>Adjacent sector — discuss fit</option>
              </select>
            </Field>
            <Field
              label="Site count"
              name="sites"
              type="number"
              min="1"
              max="9999"
              placeholder="For context only"
              defaultValue={summary?.sites}
            />
            <Field
              label="Line or product-family scope"
              name="line"
              placeholder="e.g. One assembly line"
              maxLength="120"
              defaultValue={summary?.line}
            />
            <Field
              label="Current workflow"
              name="workflow"
              placeholder="e.g. QMS exports and manual chronology"
              maxLength="240"
              defaultValue={summary?.workflow}
            />
          </>
        )}
        {isContact && (
          <>
            <Field label="Inquiry type" name="inquiryType" required>
              <select
                name="inquiryType"
                required
                defaultValue={summary?.inquiryType}
              >
                <option>Product / evaluation</option>
                <option>Data-access question</option>
                <option>Privacy / deletion</option>
                <option>General inquiry</option>
              </select>
            </Field>
            <Field
              label="Business context"
              name="message"
              help="No serials, machine settings, proprietary images or sensitive details."
            >
              <textarea
                name="message"
                rows="4"
                maxLength="1000"
                defaultValue={summary?.message}
              />
            </Field>
          </>
        )}
      </div>
      {full && (
        <div hidden={step !== 2} className="form-grid">
          <Field label="Budget / accountability owner" name="budgetOwner">
            <select
              name="budgetOwner"
              defaultValue={summary?.budgetOwner || ""}
            >
              <option value="">Select readiness</option>
              <option>I own this budget / decision</option>
              <option>Owner identified</option>
              <option>Owner not yet identified</option>
            </select>
          </Field>
          {[
            ["operator", "Named day-to-day operator"],
            ["dataOwner", "Data / integration owner"],
            ["grader", "Quality-lead grader"],
          ].map(([name, label]) => (
            <Field key={name} label={label} name={name}>
              <select name={name} defaultValue={summary?.[name] || ""}>
                <option value="">Select readiness</option>
                <option>Identified and available</option>
                <option>Identified; availability unknown</option>
                <option>Not yet identified</option>
              </select>
            </Field>
          ))}
          <Field
            label="Three closed incidents available?"
            name="historicalCases"
          >
            <select
              name="historicalCases"
              defaultValue={summary?.historicalCases}
            >
              <option>Unknown / needs review</option>
              <option>Yes, subject to permission</option>
              <option>No</option>
            </select>
          </Field>
          <Field label="Authorized anonymized export" name="permission">
            <select name="permission" defaultValue={summary?.permission}>
              <option>Needs human review</option>
              <option>Authorization identified; scope to verify</option>
              <option>No authorization</option>
            </select>
          </Field>
          <Field label="Procurement / legal status" name="legal">
            <select name="legal" defaultValue={summary?.legal}>
              <option>Not yet reviewed</option>
              <option>Review can be arranged</option>
              <option>Unable to arrange review</option>
            </select>
          </Field>
          <Field label="Willingness to discuss paid scope" name="paid">
            <select name="paid" defaultValue={summary?.paid}>
              <option>Discuss a conditional paid evaluation</option>
              <option>Budget not yet established</option>
              <option>Research interest only</option>
            </select>
          </Field>
          <p className="form-help full-width">
            Permission is not inferred from these answers. Do not enter
            colleagues’ personal details here; role readiness is enough.
          </p>
        </div>
      )}
      <div hidden={full && step !== 3} className="consent-area">
        <div className="consent-row">
          <label>
            <input
              name="followUp"
              type="checkbox"
              required={!(full && step !== 3)}
              defaultChecked={summary?.followUp}
            />
            <span>
              I agree to follow-up about this{" "}
              {isWaitlist ? "research interest" : "inquiry"}.
            </span>
          </label>
          <label>
            <input
              name="marketing"
              type="checkbox"
              defaultChecked={summary?.marketing}
            />
            <span>
              Send me research updates <span className="muted">(optional)</span>
              .
            </span>
          </label>
        </div>
        <p className="form-help">
          Real-data requests move to a human security/legal review. Marketing
          consent is optional. <Link to="/legal/privacy">Privacy notice</Link>.
        </p>
      </div>
      <div className="form-actions">
        <Button type="submit">{full && step < 3 ? "Continue" : label}</Button>
        {full && step > 1 && (
          <button
            type="button"
            className="text-link"
            onClick={() => setStep((s) => s - 1)}
          >
            <ArrowLeft size={16} />
            Back
          </button>
        )}
        <span className="form-unconnected">
          <Info size={17} />
          Concept form — not connected.
          <br />
          No inquiry is sent from this preview.
        </span>
      </div>
      {!isContact && !isWaitlist && (
        <TextLink to="/demo">Explore the synthetic demo instead</TextLink>
      )}
    </form>
  );
}
