import React from 'react';
import TalentFields from './TalentFields';
import { FiTrash2, FiPlus } from 'react-icons/fi';
import { currencies } from '../data/mockData';

export default function ReqSection({
  index,
  section,
  selectedReqs,
  reqSections,
  setReqSections,
  errors,
  form,
  onRemove,
  onAdd,
  isViewOnly
}) {

  const handleReqSelect = (reqId) => {
    const req = selectedReqs.find(r => r.reqId === reqId);

    setReqSections(prev => {
      return prev.map((sec, i) => {
        if (i !== index) return sec;
        
        const newTalents = req ? req.talents.reduce((acc, t) => {
          acc[t.id] = {
            selected: false,
            jobTitle: req.title,
            jobId: req.reqId,
            duration: "",
            billRate: "",
            stdBR: "",
            otBR: "",
            currency1: currencies[0],
            currency2: currencies[0],
            currency3: currencies[0]
          };
          return acc;
        }, {}) : {};

        return {
          ...sec,
          reqId: reqId,
          jobTitle: req ? req.title : "",
          jobId: req ? req.reqId : "",
          talents: newTalents
        };
      });
    });
  };

  const toggleTalent = (talentId) => {
    setReqSections(prev => {
      return prev.map((sec, i) => {
        if (i !== index) return sec;
        
        if (!sec.talents || !sec.talents[talentId]) return sec;

        // Check Individual PO rule
        if (form.poType === "Individual") {
          const selectedCount = Object.values(sec.talents).filter(t => t.selected).length;
          if (!sec.talents[talentId].selected && selectedCount >= 1) {
            alert("Individual PO allows selecting only one talent.");
            return sec;
          }
        }

        const newTalents = { ...sec.talents };
        newTalents[talentId] = {
          ...newTalents[talentId],
          selected: !newTalents[talentId].selected
        };

        // Clear fields when unselected
        if (!newTalents[talentId].selected) {
          newTalents[talentId] = {
            ...newTalents[talentId],
            duration: "",
            billRate: "",
            stdBR: "",
            otBR: ""
          };
        }

        return {
          ...sec,
          talents: newTalents
        };
      });
    });
  };

  const updateTalentField = (idx, talentId, key, value) => {
    setReqSections(prev => {
      return prev.map((sec, i) => {
        if (i !== idx) return sec;
        if (!sec.talents || !sec.talents[talentId]) return sec;
        
        return {
          ...sec,
          talents: {
            ...sec.talents,
            [talentId]: {
              ...sec.talents[talentId],
              [key]: value
            }
          }
        };
      });
    });
  };

  const updateSectionField = (field, value) => {
    setReqSections(prev => {
      return prev.map((sec, i) => {
        if (i !== index) return sec;
        return { ...sec, [field]: value };
      });
    });
  };

  const req = selectedReqs.find(r => r.reqId === section.reqId);

  return (
    <div className="req-section">
      <div className="req-header">
        <div className="req-left">
          <label className="req-label">
            Job Title / REQ Name <span className="req">*</span>
          </label>
        </div>

    
        <div className="req-actions">
          {reqSections.length > 1 && !isViewOnly && (
            <button type="button" className="icon-btn" onClick={onRemove}>
              <FiTrash2 />
            </button>
          )}
        </div>
      </div>

      <div className="po-field">
        <div className="select-wrap">
          <select
            disabled={isViewOnly}
            value={section.reqId || ""}
            onChange={(e) => handleReqSelect(e.target.value)}
          >
            <option value="">Select</option>
            {selectedReqs.map((r) => (
              <option key={r.reqId} value={r.reqId}>
                {r.title}
              </option>
            ))}
          </select>
        </div>
        {errors[`REQ_${index}`] && (
          <div className="err">{errors[`REQ_${index}`]}</div>
        )}
      </div>

      {/* JOB TITLE AND JOB ID - NORMAL WIDTH FIELDS */}

        <div className="po-field">
          <label>Job ID / REQ ID</label>
          <input
            disabled={isViewOnly}
            value={section.jobId || section.reqId || ""}
            onChange={(e) => updateSectionField('jobId', e.target.value)}
            placeholder="Job ID / REQ ID"
          />
        </div>
    

      {req && req.talents && req.talents.length > 0 ? (
        req.talents.map((t) => {
          const tState = section.talents && section.talents[t.id] 
            ? section.talents[t.id] 
            : { selected: false };

          return (
            <div className="talent-box" key={t.id}>
              <div className="talent-top">
                <label className="checkbox-inline">
                  <input
                    disabled={isViewOnly}
                    type="checkbox"
                    checked={tState.selected || false}
                    onChange={() => toggleTalent(t.id)}
                  />
                  <span className="talent-name">{t.name}</span>
                </label>
              </div>

              {tState.selected && (
                <TalentFields
                  idx={index}
                  talent={t}
                  tState={tState}
                  updateTalentField={updateTalentField}
                  errors={errors}
                  isViewOnly={isViewOnly}
                />
              )}
            </div>
          );
        })
      ) : (
        section.reqId && (
          <div className="no-talents" style={{ padding: '12px', textAlign: 'center', color: '#666' }}>
            No talents available for this REQ
          </div>
        )
      )}

      {/* Add Another Button */}
      {form.poType === "Group" && !isViewOnly && (
        <div className="add-section-row">
          <button type="button" className="btn-add" onClick={onAdd}>
            <FiPlus /> Add Another
          </button>
        </div>
      )}
    </div>
  );
}