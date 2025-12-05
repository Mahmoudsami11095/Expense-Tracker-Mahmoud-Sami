(function(){const n=document.createElement("link").relList;if(n&&n.supports&&n.supports("modulepreload"))return;for(const t of document.querySelectorAll('link[rel="modulepreload"]'))d(t);new MutationObserver(t=>{for(const s of t)if(s.type==="childList")for(const l of s.addedNodes)l.tagName==="LINK"&&l.rel==="modulepreload"&&d(l)}).observe(document,{childList:!0,subtree:!0});function o(t){const s={};return t.integrity&&(s.integrity=t.integrity),t.referrerPolicy&&(s.referrerPolicy=t.referrerPolicy),t.crossOrigin==="use-credentials"?s.credentials="include":t.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function d(t){if(t.ep)return;t.ep=!0;const s=o(t);fetch(t.href,s)}})();let r=[];const m=document.getElementById("expense-form"),a=document.getElementById("expense-list"),x=document.getElementById("total-amount"),u=document.getElementById("highest-expense-title"),p=document.getElementById("highest-expense-amount"),i=document.getElementById("filter-category");document.addEventListener("DOMContentLoaded",()=>{w(),document.getElementById("date").valueAsDate=new Date});m.addEventListener("submit",y);i.addEventListener("change",E);a.addEventListener("click",h);function y(e){e.preventDefault();const n=document.getElementById("title").value.trim(),o=parseFloat(document.getElementById("amount").value),d=document.getElementById("category").value,t=document.getElementById("date").value;if(!n||isNaN(o)||o<=0||!t){alert("Please fill in all fields correctly.");return}const s={id:Date.now().toString(),title:n,amount:o,category:d,date:t};v(s),m.reset(),document.getElementById("date").valueAsDate=new Date}function h(e){if(e.target.closest(".delete-btn")){const n=e.target.closest(".delete-btn").dataset.id;b(n)}}function E(){f(i.value)}function v(e){r.push(e),g(),c()}function b(e){r.find(o=>o.id===e)&&(r=r.filter(o=>o.id!==e),g(),c())}function c(){f(i.value),I(),L()}function f(e="All"){a.innerHTML="";const n=e==="All"?r:r.filter(o=>o.category===e);if(n.length===0){a.innerHTML=`
            <tr>
                <td colspan="5" class="text-center text-gray-400 py-8">
                    ${r.length===0?"No expenses added yet.":"No expenses found for this category."}
                </td>
            </tr>
        `;return}a.innerHTML=n.map(({id:o,title:d,category:t,date:s,amount:l})=>`
        <tr class="border-b border-gray-100 hover:bg-gray-50 transition group">
            <td class="py-3 px-1 font-medium text-gray-800">${d}</td>
            <td class="py-3 px-1">
                <span class="px-2 py-1 text-xs font-semibold rounded-full bg-indigo-100 text-indigo-700">
                    ${t}
                </span>
            </td>
            <td class="py-3 px-1 text-gray-500">${B(s)}</td>
            <td class="py-3 px-1 text-right font-bold text-gray-700">$${l.toFixed(2)}</td>
            <td class="py-3 px-1 text-center">
                <button class="delete-btn text-red-400 hover:text-red-600 transition p-1 rounded-md hover:bg-red-50" data-id="${o}" title="Delete">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path fill-rule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clip-rule="evenodd" />
                    </svg>
                </button>
            </td>
        </tr>
    `).join("")}function I(){const e=r.reduce((n,o)=>n+o.amount,0);x.textContent=`$${e.toFixed(2)}`}function L(){if(r.length===0){u.textContent="-",p.textContent="$0.00";return}const e=[...r].sort((n,o)=>o.amount-n.amount)[0];u.textContent=e.title,p.textContent=`$${e.amount.toFixed(2)}`}function B(e){const n={year:"numeric",month:"short",day:"numeric"};return new Date(e).toLocaleDateString(void 0,n)}function g(){localStorage.setItem("expenses",JSON.stringify(r))}function w(){const e=localStorage.getItem("expenses");e&&(r=JSON.parse(e),c())}
