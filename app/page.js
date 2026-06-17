"use client";

import { useState } from "react";
import styles from "./page.module.css";

const GST_RATES = [5, 12, 18, 28];

export default function GSTCalculator() {
  const [amount, setAmount] = useState("");
  const [gstRate, setGstRate] = useState(18);
  const [results, setResults] = useState(null);
  const [error, setError] = useState("");
  const [calculated, setCalculated] = useState(false);

  const validate = (value) => {
    if (value.trim() === "") {
      return "Please enter an amount.";
    }
    const num = parseFloat(value);
    if (isNaN(num)) {
      return "Please enter a valid numeric amount.";
    }
    if (num <= 0) {
      return "Amount must be greater than zero.";
    }
    return null;
  };

  const handleCalculate = () => {
    const validationError = validate(amount);
    if (validationError) {
      setError(validationError);
      setResults(null);
      setCalculated(false);
      return;
    }

    setError("");
    const original = parseFloat(amount);
    const gstAmount = parseFloat(((original * gstRate) / 100).toFixed(2));
    const total = parseFloat((original + gstAmount).toFixed(2));

    setResults({ original, gstAmount, total });
    setCalculated(true);
  };

  const handleReset = () => {
    setAmount("");
    setGstRate(18);
    setResults(null);
    setError("");
    setCalculated(false);
  };

  const handleAmountChange = (e) => {
    setAmount(e.target.value);
    if (error) setError("");
    if (calculated) setCalculated(false);
  };

  const formatCurrency = (value) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 2,
    }).format(value);
  };

  return (
    <main className={styles.main}>
      {/* Background Orbs */}
      <div className={styles.bgOrb1} />
      <div className={styles.bgOrb2} />
      <div className={styles.bgOrb3} />

      {/* Header */}
      <header className={styles.header}>
        <div className={styles.headerBadge}>🇮🇳 India GST Tool</div>
        <h1 className={styles.title}>GST Calculator</h1>
        <p className={styles.subtitle}>
          Instantly calculate Goods &amp; Services Tax for any amount
        </p>
      </header>

      {/* Calculator Card */}
      <section className={styles.card} aria-label="GST Calculator Form">
        <div className={styles.cardHeader}>
          <span className={styles.cardIcon}>⚡</span>
          <h2 className={styles.cardTitle}>Calculate GST</h2>
        </div>

        {/* Amount Input */}
        <div className={styles.formGroup}>
          <label className={styles.label} htmlFor="amount">
            Enter Amount (₹)
          </label>
          <div className={styles.inputWrapper}>
            <span className={styles.inputPrefix}>₹</span>
            <input
              id="amount"
              type="number"
              className={`${styles.input} ${error ? styles.inputError : ""}`}
              placeholder="e.g. 10000"
              value={amount}
              onChange={handleAmountChange}
              min="0"
              step="0.01"
              aria-describedby={error ? "amount-error" : undefined}
              aria-invalid={!!error}
            />
          </div>
          {error && (
            <p id="amount-error" className={styles.errorText} role="alert">
              ⚠️ {error}
            </p>
          )}
        </div>

        {/* GST Rate Selector */}
        <div className={styles.formGroup}>
          <label className={styles.label}>Select GST Rate</label>
          <div className={styles.rateGrid}>
            {GST_RATES.map((rate) => (
              <button
                key={rate}
                type="button"
                className={`${styles.rateBtn} ${
                  gstRate === rate ? styles.rateBtnActive : ""
                }`}
                onClick={() => {
                  setGstRate(rate);
                  if (calculated) setCalculated(false);
                }}
                aria-pressed={gstRate === rate}
              >
                {rate}%
              </button>
            ))}
          </div>
        </div>

        {/* Action Buttons */}
        <div className={styles.btnGroup}>
          <button
            id="calculate-btn"
            className={styles.btnCalculate}
            onClick={handleCalculate}
            type="button"
          >
            <span className={styles.btnIcon}>🧮</span>
            Calculate GST
          </button>
          <button
            id="reset-btn"
            className={styles.btnReset}
            onClick={handleReset}
            type="button"
          >
            <span className={styles.btnIcon}>↺</span>
            Reset
          </button>
        </div>
      </section>

      {/* Results Section */}
      {results && (
        <section
          className={`${styles.resultsSection} ${
            calculated ? styles.resultsVisible : ""
          }`}
          aria-label="Calculation Results"
          aria-live="polite"
        >
          <h2 className={styles.resultsTitle}>
            <span className={styles.resultsTitleIcon}>📊</span> Results at{" "}
            {gstRate}% GST
          </h2>
          <div className={styles.resultsGrid}>
            {/* Original Amount */}
            <div className={`${styles.resultCard} ${styles.resultCardBlue}`}>
              <div className={styles.resultCardIcon}>💰</div>
              <p className={styles.resultCardLabel}>Original Amount</p>
              <p className={styles.resultCardValue}>
                {formatCurrency(results.original)}
              </p>
              <div className={styles.resultCardBar} />
            </div>

            {/* GST Amount */}
            <div className={`${styles.resultCard} ${styles.resultCardPurple}`}>
              <div className={styles.resultCardIcon}>🏛️</div>
              <p className={styles.resultCardLabel}>GST Amount ({gstRate}%)</p>
              <p className={styles.resultCardValue}>
                {formatCurrency(results.gstAmount)}
              </p>
              <div className={styles.resultCardBar} />
            </div>

            {/* Total Amount */}
            <div className={`${styles.resultCard} ${styles.resultCardGreen}`}>
              <div className={styles.resultCardIcon}>🧾</div>
              <p className={styles.resultCardLabel}>Total Amount</p>
              <p
                className={`${styles.resultCardValue} ${styles.resultCardValueLarge}`}
              >
                {formatCurrency(results.total)}
              </p>
              <div className={styles.resultCardBar} />
            </div>
          </div>

          {/* Summary Row */}
          <div className={styles.summaryRow}>
            <span className={styles.summaryText}>
              ₹{results.original.toLocaleString("en-IN")} + {gstRate}% GST ={" "}
              <strong>{formatCurrency(results.total)}</strong>
            </span>
          </div>
        </section>
      )}

      {/* Footer / Author Info */}
      <footer className={styles.footer}>
        <div className={styles.authorCard}>
          <div className={styles.authorAvatar}>VS</div>
          <div className={styles.authorInfo}>
            <p className={styles.authorName}>V S VIGHNESH</p>
            <p className={styles.authorEmail}>your-email@gmail.com</p>
          </div>
        </div>

        <a
          id="digital-heroes-btn"
          href="https://digitalheroesco.com"
          target="_blank"
          rel="noopener noreferrer"
          className={styles.dhButton}
          aria-label="Visit Digital Heroes website"
        >
          <span className={styles.dhButtonIcon}>🦸</span>
          Built for Digital Heroes
          <span className={styles.dhButtonArrow}>↗</span>
        </a>

        <p className={styles.footerCopy}>
          © {new Date().getFullYear()} V S VIGHNESH · GST Calculator
        </p>
      </footer>
    </main>
  );
}
