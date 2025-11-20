// src/components/TalentFields.jsx
import React from 'react';
import { currencies } from '../data/mockData';

export default function TalentFields({
  idx,
  talent,
  tState,
  updateTalentField,
  errors,
  isViewOnly
}) {
  return (
    <div className="talent-grid">

      <div className="po-grid" style={{ gridColumn: '1 / -1', marginBottom: '12px' }}>
        <div className="po-field">
          <label>Job Title / REQ Name <span className="req">*</span></label>
          <input
            disabled={isViewOnly}
            value={tState.jobTitle || ""}
            onChange={(e) =>
              updateTalentField(idx, talent.id, "jobTitle", e.target.value)
            }
            placeholder="Job Title / REQ Name"
          />
        </div>

        <div className="po-field">
          <label>Job ID / REQ ID</label>
          <input
            disabled={isViewOnly}
            value={tState.jobId || ""}
            onChange={(e) =>
              updateTalentField(idx, talent.id, "jobId", e.target.value)
            }
            placeholder="Job ID / REQ ID"
          />
        </div>
      </div>

      <div className="po-field ">
        <label>Contract Duration <span className="req">*</span></label>
        <div className="input-suffix contract-duration-input">
          <input
            disabled={isViewOnly}
            value={tState.duration || ""}
            onChange={(e) =>
              updateTalentField(idx, talent.id, "duration", e.target.value)
            }
            placeholder="Contract Duration"
          />
          <div className="suffix">Months</div>
        </div>
        {errors[`talent_${idx}_${talent.id}_duration`] && (
          <div className="err">{errors[`talent_${idx}_${talent.id}_duration`]}</div>
        )}
      </div>

      <div className="po-field">
        <div className="field-group">
          <div className="field-group-item">
          <label>Bill Rate <span className="req">*</span></label>

            <div className="input-suffix">
              <input
                disabled={isViewOnly}
                value={tState.billRate || ""}
                onChange={(e) =>
                  updateTalentField(idx, talent.id, "billRate", e.target.value)
                }
                placeholder="Bill Rate"
              />
              <div className="suffix">/hr</div>
            </div>
            {errors[`talent_${idx}_${talent.id}_billRate`] && (
              <div className="err">{errors[`talent_${idx}_${talent.id}_billRate`]}</div>
            )}
          </div>
          <div className="field-group-item">
          <label>Currency <span className="req">*</span></label>
            <select
              disabled={isViewOnly}
              value={tState.currency1 || currencies[0]}
              onChange={(e) =>
                updateTalentField(idx, talent.id, "currency1", e.target.value)
              }
            >
              {currencies.map(c => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      <div className="po-field">
        <div className="field-group">
          <div className="field-group-item">
          <label>Standard Time BR <span className="req">*</span></label>
            <div className="input-suffix">
              <input
                disabled={isViewOnly}
                value={tState.stdBR || ""}
                onChange={(e) =>
                  updateTalentField(idx, talent.id, "stdBR", e.target.value)
                }
                placeholder="Std. Time BR"
              />
              <div className="suffix">/hr</div>
            </div>
          </div>
          <div className="field-group-item">
          <label>Currency <span className="req">*</span></label>
            <select
              disabled={isViewOnly}
              value={tState.currency2 || currencies[0]}
              onChange={(e) =>
                updateTalentField(idx, talent.id, "currency2", e.target.value)
              }
            >
              {currencies.map(c => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      <div className="po-field">
        <div className="field-group">
          <div className="field-group-item">
          <label>Over Time <span className="req">*</span></label>
            <div className="input-suffix">
              <input
                disabled={isViewOnly}
                value={tState.otBR || ""}
                onChange={(e) =>
                  updateTalentField(idx, talent.id, "otBR", e.target.value)
                }
                placeholder="Over Time BR"
              />
              <div className="suffix">/hr</div>
            </div>
          </div>
          <div className="field-group-item">
          <label>Currency <span className="req">*</span></label>
            <select
              disabled={isViewOnly}
              value={tState.currency3 || currencies[0]}
              onChange={(e) =>
                updateTalentField(idx, talent.id, "currency3", e.target.value)
              }
            >
              {currencies.map(c => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

    </div>
  );
}
