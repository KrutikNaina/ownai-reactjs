// src/components/PurchaseOrderForm.jsx
import React, { useState } from 'react';
import ReqSection from './ReqSection';
import { clients, reqsData, currencies } from '../data/mockData';
import '../styles/style.css';

const emptyReqSection = () => ({ id: Date.now() + Math.random(), reqId: '', jobTitle: '', talents: {} });

export default function PurchaseOrderForm() {
  const [form, setForm] = useState({
    clientId: '',
    poType: '',
    poNumber: '',
    receivedOn: '',
    receivedFromName: '',
    receivedFromEmail: '',
    poStartDate: '',
    poEndDate: '',
    budget: '',
    currency: currencies[0]
  });

  const [reqSections, setReqSections] = useState([emptyReqSection()]);
  const [errors, setErrors] = useState({});

  const updateForm = (k, v) => setForm(p => ({ ...p, [k]: v }));

  const selectedReqs = form.clientId ? reqsData[form.clientId] || [] : [];

  const addReqSection = () => setReqSections(p => [...p, emptyReqSection()]);
  const removeReqSection = (idx) => setReqSections(p => p.filter((_, i) => i !== idx));

  // Validation Start
  const validate = () => {
    const e = {};
    if (!form.clientId) e.clientId = 'Client is required';
    if (!form.poType) e.poType = 'PO Type required';
    if (!form.poNumber) e.poNumber = 'PO Number required';
    if (!form.receivedOn) e.receivedOn = 'Received On required';
    if (!form.receivedFromName) e.receivedFromName = 'Received From required';
    if (!form.poStartDate) e.poStartDate = 'Start date required';
    if (!form.poEndDate) e.poEndDate = 'End date required';
    if (form.poStartDate && form.poEndDate && new Date(form.poEndDate) < new Date(form.poStartDate))
      e.poEndDate = 'End date cannot be before start date';

    if (!form.budget) e.budget = 'Budget required';
    else if (!/^\d{1,5}$/.test(form.budget)) e.budget = 'Budget digits max 5';

    reqSections.forEach((sec, idx) => {
      if (!sec.reqId) e[`REQ_${idx}`] = 'Select Job Title';
      Object.entries(sec.talents || {}).forEach(([tid, t]) => {
        if (t.selected) {
          if (!t.duration) e[`talent_${idx}_${tid}_duration`] = 'Contract duration required';
          if (!t.billRate) e[`talent_${idx}_${tid}_billRate`] = 'Bill rate required';
        }
      });
    });


    // Checkbox for Validation
    const totalSelected = reqSections.reduce((acc, s) =>
      acc + Object.values(s.talents || {}).filter(t => t.selected).length, 0
    );

    if (form.poType === 'Individual' && totalSelected > 1)
      e.poTypeLimit = 'Individual PO allows only one talent';

    if (form.poType === 'Group' && totalSelected < 2)
      e.poTypeLimit = 'Group PO requires at least two talents';

    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = (ev) => {
    ev.preventDefault();
    if (!validate()) return;

    const payload = { ...form, reqSections };
    console.log("Form submitted:", payload);
    alert("Form submitted — check console");
  };

  const resetForm = () => {
    setForm({
      clientId: '',
      poType: '',
      poNumber: '',
      receivedOn: '',
      receivedFromName: '',
      receivedFromEmail: '',
      poStartDate: '',
      poEndDate: '',
      budget: '',
      currency: currencies[0]
    });
    setReqSections([emptyReqSection()]);
    setErrors({});
  };

  return (
    <div className="po-wrapper">
      <form onSubmit={handleSubmit}>
        <div className="po-header">
          <div className="back-crumb">‹</div>
          <h1 className="page-title">Purchase Order | New</h1>
        </div>

        <div className="po-card">
          <div className="po-grid">

            <div className="po-field">
              <label>Client Name <span className="req">*</span></label>
              <div className="select-wrap">
                <select value={form.clientId} onChange={e => updateForm('clientId', e.target.value)}>
                  <option value="">Select</option>
                  {clients.map(c => (
                    <option key={c.id} value={c.id}>{c.name}</option>
                  ))}
                </select>
              </div>
              {errors.clientId && <div className="err">{errors.clientId}</div>}
            </div>

            <div className="po-field">
              <label>Purchase Order Type <span className="req">*</span></label>
              <select value={form.poType} onChange={e => updateForm('poType', e.target.value)}>
                <option value="">Select</option>
                <option value="Group">Group PO</option>
                <option value="Individual">Individual PO</option>
              </select>
              {errors.poType && <div className="err">{errors.poType}</div>}
            </div>

          
            <div className="po-field">
              <label>Purchase Order No <span className="req">*</span></label>
              <input
                value={form.poNumber}
                onChange={e => updateForm('poNumber', e.target.value)}
                placeholder="PO Number"
              />
              {errors.poNumber && <div className="err">{errors.poNumber}</div>}
            </div>

            <div className="po-field">
              <label>Received On <span className="req">*</span></label>
              <input
                type="date"
                value={form.receivedOn}
                onChange={e => updateForm('receivedOn', e.target.value)}
              />
              {errors.receivedOn && <div className="err">{errors.receivedOn}</div>}
            </div>

            <div className="po-field">
              <label>Received From <span className="req">*</span></label>
              <input
                value={form.receivedFromName}
                onChange={e => updateForm('receivedFromName', e.target.value)}
                placeholder="Received From Name"
              />
              {errors.receivedFromName && <div className="err">{errors.receivedFromName}</div>}
            </div>

            <div className="po-field">
              <label>Received From Email</label>
              <input
                value={form.receivedFromEmail}
                onChange={e => updateForm('receivedFromEmail', e.target.value)}
                placeholder="Email"
              />
            </div>

            <div className="po-field">
              <div className="field-group">
                <div className="field-group-item">
                <label>PO Start Date <span className="req">*</span></label>
                  <input
                    type="date"
                    value={form.poStartDate}
                    onChange={e => updateForm('poStartDate', e.target.value)}
                  />
                  {errors.poStartDate && <div className="err">{errors.poStartDate}</div>}
                </div>

                <div className="field-group-item">
                <label>PO END Date <span className="req">*</span></label>
                  <input
                    type="date"
                    min={form.poStartDate || ""}
                    value={form.poEndDate}
                    onChange={e => updateForm('poEndDate', e.target.value)}
                  />
                  {errors.poEndDate && <div className="err">{errors.poEndDate}</div>}
                </div>
              </div>
            </div>

            <div className="po-field">
              <div className="field-group">
                <div className="field-group-item">
                  <label>Budget <span className="req">*</span></label>
                  <input
                    value={form.budget}
                    maxLength={5}
                    onChange={e => updateForm('budget', e.target.value.replace(/\D/g, ''))}
                    placeholder="Budget"
                  />
                  {errors.budget && <div className="err">{errors.budget}</div>}
                </div>

                <div className="field-group-item">
                  <label>Currency <span className="req">*</span></label>
                  <select value={form.currency} onChange={e => updateForm('currency', e.target.value)}>
                    {currencies.map(c => (
                      <option key={c} value={c}>{c}</option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
          </div>
        </div>
        

        {/* start ReqSection Components */}
        <h3 className="sec-title">Talent Detail</h3>

        {reqSections.map((section, idx) => (
          <ReqSection
            key={section.id}
            index={idx}
            section={section}
            selectedReqs={selectedReqs}
            reqSections={reqSections}
            setReqSections={setReqSections}
            errors={errors}
            form={form}
            onRemove={() => removeReqSection(idx)}
            onAdd={addReqSection}
          />
        ))}

        {errors.poTypeLimit && <div className="err">{errors.poTypeLimit}</div>}

        {/* Button Start */}
        <div className="form-actions">
          <button type="button" className="btn-outline" onClick={resetForm}>
            Reset
          </button>

          <button type="submit" className="btn-primary">
            Submit
          </button>
        </div>
      </form>
    </div>
  );
}
