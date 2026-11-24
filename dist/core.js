/* Calendar dates are local, with UTC arithmetic to avoid daylight-saving offsets. */
const MedicineCore = (() => {
  const today = () => {const d=new Date();return `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}-${String(d.getDate()).padStart(2,'0')}`;};
  const stamp = s => Date.parse(s+'T00:00:00Z');
  const addDays = (s,n) => new Date(stamp(s)+Number(n)*86400000).toISOString().slice(0,10);
  const addMonths = (s,n) => {const d=new Date(stamp(s));const day=d.getUTCDate();d.setUTCDate(1);d.setUTCMonth(d.getUTCMonth()+n);const last=new Date(Date.UTC(d.getUTCFullYear(),d.getUTCMonth()+1,0)).getUTCDate();d.setUTCDate(Math.min(day,last));return d.toISOString().slice(0,10);};
  const presetDays = (kind,opened) => kind==='syrup'?'':Math.round((stamp(addMonths(opened,kind==='eye'?1:6))-stamp(opened))/86400000);
  const deadline = m => {const calculated=addDays(m.opened,m.days);return m.printed && m.printed<calculated?m.printed:calculated;};
  const remaining = (m,date=today()) => Math.round((stamp(deadline(m))-stamp(date))/86400000);
  return {today,addDays,addMonths,presetDays,deadline,remaining};
})();
if(typeof module!=='undefined') module.exports=MedicineCore;
