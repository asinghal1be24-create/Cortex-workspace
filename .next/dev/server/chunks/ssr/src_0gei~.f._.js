module.exports = [
"[project]/src/components/TextEditor.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>TextEditor
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tiptap$2f$react$2f$dist$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/@tiptap/react/dist/index.js [app-ssr] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tiptap$2f$core$2f$dist$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@tiptap/core/dist/index.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tiptap$2f$starter$2d$kit$2f$dist$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@tiptap/starter-kit/dist/index.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tiptap$2f$extension$2d$image$2f$dist$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@tiptap/extension-image/dist/index.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tiptap$2f$extension$2d$table$2f$dist$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@tiptap/extension-table/dist/index.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tiptap$2f$extension$2d$table$2d$row$2f$dist$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/@tiptap/extension-table-row/dist/index.js [app-ssr] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tiptap$2f$extension$2d$table$2d$cell$2f$dist$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/@tiptap/extension-table-cell/dist/index.js [app-ssr] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tiptap$2f$extension$2d$table$2d$header$2f$dist$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/@tiptap/extension-table-header/dist/index.js [app-ssr] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
"use client";
;
;
;
;
;
;
;
;
;
;
const FontSize = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tiptap$2f$core$2f$dist$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Mark"].create({
    name: 'fontSize',
    addOptions () {
        return {
            types: [
                'textStyle'
            ]
        };
    },
    addAttributes () {
        return {
            fontSize: {
                default: null,
                parseHTML: (element)=>element.style.fontSize?.replace(/['"]+/g, ''),
                renderHTML: (attributes)=>{
                    if (!attributes.fontSize) return {};
                    return {
                        style: `font-size: ${attributes.fontSize}`
                    };
                }
            }
        };
    },
    parseHTML () {
        return [
            {
                tag: 'span[style*=font-size]'
            }
        ];
    },
    renderHTML ({ HTMLAttributes }) {
        return [
            'span',
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tiptap$2f$core$2f$dist$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["mergeAttributes"])(this.options.HTMLAttributes, HTMLAttributes),
            0
        ];
    },
    addCommands () {
        return {
            setFontSize: (fontSize)=>({ chain })=>chain().setMark('fontSize', {
                        fontSize
                    }).run(),
            unsetFontSize: ()=>({ chain })=>chain().unsetMark('fontSize').run()
        };
    }
});
// ── PageStrip ────────────────────────────────────────────────────────────────
function PageStrip({ pages, currentIdx, onSelect, onAdd }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        style: {
            height: 40,
            flexShrink: 0,
            borderTop: '1px solid var(--color-cortex-border)',
            background: 'var(--color-cortex-sidebar)',
            display: 'flex',
            alignItems: 'center',
            padding: '0 16px',
            gap: 4,
            overflowX: 'auto'
        },
        children: [
            pages.map((pg, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                    onClick: ()=>onSelect(i),
                    style: {
                        padding: '3px 14px',
                        borderRadius: 6,
                        fontSize: 11,
                        fontWeight: 500,
                        cursor: 'pointer',
                        transition: 'all .15s',
                        whiteSpace: 'nowrap',
                        background: currentIdx === i ? 'var(--color-cortex-amberGlow)' : 'transparent',
                        color: currentIdx === i ? 'var(--color-cortex-amber)' : 'var(--color-cortex-muted)',
                        border: currentIdx === i ? '1px solid var(--color-cortex-amberBorder)' : '1px solid transparent'
                    },
                    children: i + 1
                }, pg.id, false, {
                    fileName: "[project]/src/components/TextEditor.tsx",
                    lineNumber: 84,
                    columnNumber: 9
                }, this)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                onClick: onAdd,
                title: "Add page",
                style: {
                    marginLeft: 4,
                    width: 26,
                    height: 26,
                    borderRadius: 6,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: 16,
                    lineHeight: 1,
                    cursor: 'pointer',
                    flexShrink: 0,
                    background: 'transparent',
                    color: 'var(--color-cortex-muted)',
                    border: '1px dashed var(--color-cortex-border)',
                    transition: 'all .15s'
                },
                children: "+"
            }, void 0, false, {
                fileName: "[project]/src/components/TextEditor.tsx",
                lineNumber: 92,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/TextEditor.tsx",
        lineNumber: 77,
        columnNumber: 5
    }, this);
}
// ── Table size picker (hover grid) ───────────────────────────────────────────
function TablePicker({ onPick, onClose }) {
    const [hover, setHover] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])({
        r: 0,
        c: 0
    });
    const MAX = 8;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        style: {
            position: 'absolute',
            top: 44,
            left: 0,
            zIndex: 100,
            background: 'var(--color-cortex-elevated)',
            border: '1px solid var(--color-cortex-border)',
            borderRadius: 10,
            padding: 10,
            boxShadow: '0 8px 24px rgba(0,0,0,0.4)'
        },
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                style: {
                    fontSize: 10,
                    color: 'var(--color-cortex-muted)',
                    marginBottom: 6,
                    textAlign: 'center'
                },
                children: hover.r > 0 ? `${hover.r} × ${hover.c}` : 'Hover to pick size'
            }, void 0, false, {
                fileName: "[project]/src/components/TextEditor.tsx",
                lineNumber: 116,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                style: {
                    display: 'grid',
                    gridTemplateColumns: `repeat(${MAX}, 18px)`,
                    gap: 3
                },
                children: Array.from({
                    length: MAX * MAX
                }, (_, i)=>{
                    const r = Math.floor(i / MAX) + 1;
                    const c = i % MAX + 1;
                    const active = r <= hover.r && c <= hover.c;
                    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        onMouseEnter: ()=>setHover({
                                r,
                                c
                            }),
                        onClick: ()=>{
                            onPick(hover.r, hover.c);
                            onClose();
                        },
                        style: {
                            width: 18,
                            height: 18,
                            borderRadius: 3,
                            cursor: 'pointer',
                            background: active ? 'var(--color-cortex-amber)' : 'var(--color-cortex-surface)',
                            border: `1px solid ${active ? 'var(--color-cortex-amberBorder)' : 'var(--color-cortex-border)'}`,
                            transition: 'all .1s'
                        }
                    }, i, false, {
                        fileName: "[project]/src/components/TextEditor.tsx",
                        lineNumber: 125,
                        columnNumber: 13
                    }, this);
                })
            }, void 0, false, {
                fileName: "[project]/src/components/TextEditor.tsx",
                lineNumber: 119,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/TextEditor.tsx",
        lineNumber: 110,
        columnNumber: 5
    }, this);
}
function OverlayItem({ overlay, onRemove, onUpdate }) {
    const containerRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(null);
    const dragRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(null);
    const resizeRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(null);
    const [mousePos, setMousePos] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null);
    // ── Unified pointer handlers ──
    const onPD = (e)=>{
        if (e.target.closest('.nd')) return;
        e.stopPropagation();
        containerRef.current?.setPointerCapture(e.pointerId);
        dragRef.current = {
            ox: e.clientX - overlay.x,
            oy: e.clientY - overlay.y
        };
    };
    const startResize = (e, dir)=>{
        e.stopPropagation();
        containerRef.current?.setPointerCapture(e.pointerId);
        const w = overlay.imgWidth ?? 280;
        const h = overlay.imgHeight ?? 200;
        resizeRef.current = {
            dir,
            sx: e.clientX,
            sy: e.clientY,
            sw: w,
            sh: h,
            sox: overlay.x,
            soy: overlay.y,
            ar: w / h
        };
    };
    const onPM = (e)=>{
        if (resizeRef.current) {
            const rs = resizeRef.current;
            const dx = e.clientX - rs.sx, dy = e.clientY - rs.sy;
            const MIN = 60;
            let nw = rs.sw, nh = rs.sh, nx = rs.sox, ny = rs.soy;
            switch(rs.dir){
                case 'se':
                    nw = Math.max(MIN, rs.sw + dx);
                    nh = nw / rs.ar;
                    break;
                case 'sw':
                    nw = Math.max(MIN, rs.sw - dx);
                    nh = nw / rs.ar;
                    nx = rs.sox + rs.sw - nw;
                    break;
                case 'ne':
                    nw = Math.max(MIN, rs.sw + dx);
                    nh = nw / rs.ar;
                    ny = rs.soy + rs.sh - nh;
                    break;
                case 'nw':
                    nw = Math.max(MIN, rs.sw - dx);
                    nh = nw / rs.ar;
                    nx = rs.sox + rs.sw - nw;
                    ny = rs.soy + rs.sh - nh;
                    break;
                case 'e':
                    nw = Math.max(MIN, rs.sw + dx);
                    break;
                case 'w':
                    nw = Math.max(MIN, rs.sw - dx);
                    nx = rs.sox + rs.sw - nw;
                    break;
                case 's':
                    nh = Math.max(MIN, rs.sh + dy);
                    break;
                case 'n':
                    nh = Math.max(MIN, rs.sh - dy);
                    ny = rs.soy + rs.sh - nh;
                    break;
            }
            onUpdate({
                imgWidth: nw,
                imgHeight: nh,
                x: nx,
                y: ny
            });
        } else if (dragRef.current) {
            onUpdate({
                x: e.clientX - dragRef.current.ox,
                y: e.clientY - dragRef.current.oy
            });
        }
    };
    const onPU = ()=>{
        dragRef.current = null;
        resizeRef.current = null;
    };
    const base = {
        position: 'absolute',
        left: overlay.x,
        top: overlay.y,
        cursor: 'grab',
        userSelect: 'none',
        zIndex: 20,
        background: 'rgba(11,11,22,0.9)',
        backdropFilter: 'blur(8px)',
        border: '1px solid var(--color-cortex-border)',
        borderRadius: 10,
        padding: 12,
        minWidth: 130,
        boxShadow: '0 4px 20px rgba(0,0,0,0.5)'
    };
    const closeBtn = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
        className: "nd",
        onClick: onRemove,
        style: {
            position: 'absolute',
            top: -8,
            right: -8,
            width: 18,
            height: 18,
            borderRadius: '50%',
            background: 'var(--color-cortex-elevated)',
            border: '1px solid var(--color-cortex-border)',
            color: 'var(--color-cortex-muted)',
            fontSize: 11,
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
        },
        children: "×"
    }, void 0, false, {
        fileName: "[project]/src/components/TextEditor.tsx",
        lineNumber: 201,
        columnNumber: 5
    }, this);
    // ── Resize handles helper ──
    const H = 8; // handle size px
    const THRESH = 24; // px proximity to show handle
    const near = (hx, hy)=>{
        if (!mousePos && !resizeRef.current) return false;
        if (resizeRef.current) return resizeRef.current.dir !== undefined; // keep visible while resizing
        const dx = (mousePos?.x ?? 0) - hx, dy = (mousePos?.y ?? 0) - hy;
        return Math.sqrt(dx * dx + dy * dy) < THRESH;
    };
    const handleStyle = (cursor, pos, hx, hy)=>({
            position: 'absolute',
            width: H,
            height: H,
            borderRadius: 2,
            background: '#d0cde8',
            border: '1px solid rgba(255,255,255,0.5)',
            cursor,
            zIndex: 30,
            transition: 'opacity .12s',
            opacity: near(hx, hy) ? 1 : 0,
            pointerEvents: near(hx, hy) ? 'auto' : 'none',
            ...pos
        });
    const makeHandle = (dir, cursor, pos, hx, hy)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "nd",
            style: handleStyle(cursor, pos, hx, hy),
            onPointerDown: (e)=>startResize(e, dir)
        }, dir, false, {
            fileName: "[project]/src/components/TextEditor.tsx",
            lineNumber: 228,
            columnNumber: 5
        }, this);
    const resizeHandles = (w, h)=>{
        const m = -H / 2;
        return [
            makeHandle('nw', 'nwse-resize', {
                top: m,
                left: m
            }, 0, 0),
            makeHandle('n', 'ns-resize', {
                top: m,
                left: w / 2 + m
            }, w / 2, 0),
            makeHandle('ne', 'nesw-resize', {
                top: m,
                right: m
            }, w, 0),
            makeHandle('w', 'ew-resize', {
                top: h / 2 + m,
                left: m
            }, 0, h / 2),
            makeHandle('e', 'ew-resize', {
                top: h / 2 + m,
                right: m
            }, w, h / 2),
            makeHandle('sw', 'nesw-resize', {
                bottom: m,
                left: m
            }, 0, h),
            makeHandle('s', 'ns-resize', {
                bottom: m,
                left: w / 2 + m
            }, w / 2, h),
            makeHandle('se', 'nwse-resize', {
                bottom: m,
                right: m
            }, w, h)
        ];
    };
    // ── Image ──
    if (overlay.type === 'image') {
        const imgW = overlay.imgWidth ?? 280;
        const imgH = overlay.imgHeight ?? 200;
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            ref: containerRef,
            style: {
                position: 'absolute',
                left: overlay.x,
                top: overlay.y,
                cursor: resizeRef.current ? undefined : 'grab',
                userSelect: 'none',
                zIndex: 20,
                background: 'rgba(11,11,22,0.85)',
                backdropFilter: 'blur(8px)',
                border: '1px solid var(--color-cortex-border)',
                borderRadius: 10,
                padding: 6,
                boxShadow: '0 4px 20px rgba(0,0,0,0.5)',
                width: imgW + 12
            },
            onPointerDown: onPD,
            onPointerMove: (e)=>{
                // track mouse relative to image area (offset by 6px padding)
                const rect = e.currentTarget.getBoundingClientRect();
                setMousePos({
                    x: e.clientX - rect.left - 6,
                    y: e.clientY - rect.top - 6
                });
                onPM(e);
            },
            onPointerUp: onPU,
            onMouseLeave: ()=>{
                if (!resizeRef.current) setMousePos(null);
            },
            children: [
                closeBtn,
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                    src: overlay.src,
                    alt: "pinned",
                    style: {
                        width: imgW,
                        height: imgH,
                        borderRadius: 6,
                        display: 'block',
                        objectFit: 'cover',
                        pointerEvents: 'none'
                    }
                }, void 0, false, {
                    fileName: "[project]/src/components/TextEditor.tsx",
                    lineNumber: 271,
                    columnNumber: 9
                }, this),
                resizeHandles(imgW, imgH)
            ]
        }, void 0, true, {
            fileName: "[project]/src/components/TextEditor.tsx",
            lineNumber: 252,
            columnNumber: 7
        }, this);
    }
    // Checklist overlay
    if (overlay.type === 'bullets') {
        const items = overlay.items ?? [];
        const toggle = (i)=>onUpdate({
                items: items.map((it, idx)=>idx === i ? {
                        ...it,
                        checked: !it.checked
                    } : it)
            });
        const setText = (i, text)=>onUpdate({
                items: items.map((it, idx)=>idx === i ? {
                        ...it,
                        text
                    } : it)
            });
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            ref: containerRef,
            style: {
                ...base,
                minWidth: 220,
                padding: '12px 14px'
            },
            onPointerDown: onPD,
            onPointerMove: onPM,
            onPointerUp: onPU,
            children: [
                closeBtn,
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    style: {
                        fontSize: 10,
                        color: '#9a9895',
                        fontWeight: 600,
                        letterSpacing: 1,
                        marginBottom: 10,
                        textTransform: 'uppercase'
                    },
                    children: "Checklist"
                }, void 0, false, {
                    fileName: "[project]/src/components/TextEditor.tsx",
                    lineNumber: 288,
                    columnNumber: 9
                }, this),
                items.map((item, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        style: {
                            display: 'flex',
                            alignItems: 'center',
                            gap: 10,
                            marginBottom: 8
                        },
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                className: "nd",
                                onClick: ()=>toggle(i),
                                style: {
                                    width: 18,
                                    height: 18,
                                    borderRadius: '50%',
                                    flexShrink: 0,
                                    cursor: 'pointer',
                                    background: item.checked ? '#e07272' : 'transparent',
                                    border: `2px solid ${item.checked ? '#e07272' : '#9a9895'}`,
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    fontSize: 9,
                                    color: '#fff',
                                    transition: 'all .15s'
                                },
                                children: item.checked ? '✓' : ''
                            }, void 0, false, {
                                fileName: "[project]/src/components/TextEditor.tsx",
                                lineNumber: 291,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                className: "nd",
                                value: item.text,
                                onChange: (e)=>setText(i, e.target.value),
                                style: {
                                    background: 'transparent',
                                    border: 'none',
                                    outline: 'none',
                                    color: item.checked ? '#6a6780' : '#d0cde8',
                                    fontSize: 12,
                                    width: '100%',
                                    textDecoration: item.checked ? 'line-through' : 'none',
                                    transition: 'all .15s'
                                }
                            }, void 0, false, {
                                fileName: "[project]/src/components/TextEditor.tsx",
                                lineNumber: 298,
                                columnNumber: 13
                            }, this)
                        ]
                    }, i, true, {
                        fileName: "[project]/src/components/TextEditor.tsx",
                        lineNumber: 290,
                        columnNumber: 11
                    }, this)),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                    className: "nd",
                    onClick: ()=>onUpdate({
                            items: [
                                ...items,
                                {
                                    text: '',
                                    checked: false
                                }
                            ]
                        }),
                    style: {
                        fontSize: 11,
                        color: '#9a9895',
                        marginTop: 4,
                        cursor: 'pointer',
                        background: 'none',
                        border: 'none'
                    },
                    children: "+ Add item"
                }, void 0, false, {
                    fileName: "[project]/src/components/TextEditor.tsx",
                    lineNumber: 307,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/src/components/TextEditor.tsx",
            lineNumber: 286,
            columnNumber: 7
        }, this);
    }
    // Table overlay
    if (overlay.type === 'table') {
        const rows = overlay.rows ?? 3;
        const cols = overlay.cols ?? 3;
        const cells = overlay.cells ?? Array.from({
            length: rows
        }, ()=>Array(cols).fill(''));
        const bc = overlay.borderColor ?? '#c8b89a';
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            ref: containerRef,
            style: {
                ...base,
                padding: 0,
                overflow: 'visible'
            },
            onPointerDown: onPD,
            onPointerMove: onPM,
            onPointerUp: onPU,
            children: [
                closeBtn,
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    style: {
                        display: 'flex',
                        alignItems: 'center',
                        gap: 6,
                        padding: '5px 8px',
                        borderBottom: `1px solid ${bc}`,
                        background: `${bc}22`,
                        borderRadius: '10px 10px 0 0'
                    },
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                            style: {
                                fontSize: 9,
                                color: '#9a9895',
                                textTransform: 'uppercase',
                                letterSpacing: 1,
                                fontWeight: 600
                            },
                            children: "Border"
                        }, void 0, false, {
                            fileName: "[project]/src/components/TextEditor.tsx",
                            lineNumber: 326,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                            className: "nd",
                            type: "color",
                            value: bc,
                            onChange: (e)=>onUpdate({
                                    borderColor: e.target.value
                                }),
                            style: {
                                width: 18,
                                height: 18,
                                border: 'none',
                                borderRadius: 4,
                                cursor: 'pointer',
                                padding: 0,
                                background: 'transparent'
                            }
                        }, void 0, false, {
                            fileName: "[project]/src/components/TextEditor.tsx",
                            lineNumber: 327,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            style: {
                                width: 12,
                                height: 12,
                                borderRadius: 3,
                                background: bc,
                                border: '1px solid rgba(255,255,255,0.1)',
                                flexShrink: 0
                            }
                        }, void 0, false, {
                            fileName: "[project]/src/components/TextEditor.tsx",
                            lineNumber: 331,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/components/TextEditor.tsx",
                    lineNumber: 325,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("table", {
                    style: {
                        borderCollapse: 'collapse',
                        fontSize: 11
                    },
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("tbody", {
                        children: Array.from({
                            length: rows
                        }, (_, r)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("tr", {
                                children: Array.from({
                                    length: cols
                                }, (_, c)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                        style: {
                                            border: `1px solid ${bc}`,
                                            padding: 0
                                        },
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                            className: "nd",
                                            value: cells[r]?.[c] ?? '',
                                            onChange: (e)=>{
                                                const next = cells.map((row)=>[
                                                        ...row
                                                    ]);
                                                next[r][c] = e.target.value;
                                                onUpdate({
                                                    cells: next
                                                });
                                            },
                                            style: {
                                                background: r === 0 ? `${bc}28` : 'transparent',
                                                border: 'none',
                                                outline: 'none',
                                                padding: '5px 8px',
                                                color: r === 0 ? '#d0cde8' : '#b8b5cc',
                                                fontWeight: r === 0 ? 600 : 400,
                                                fontSize: 11,
                                                width: 80
                                            }
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/TextEditor.tsx",
                                            lineNumber: 339,
                                            columnNumber: 21
                                        }, this)
                                    }, c, false, {
                                        fileName: "[project]/src/components/TextEditor.tsx",
                                        lineNumber: 338,
                                        columnNumber: 19
                                    }, this))
                            }, r, false, {
                                fileName: "[project]/src/components/TextEditor.tsx",
                                lineNumber: 336,
                                columnNumber: 15
                            }, this))
                    }, void 0, false, {
                        fileName: "[project]/src/components/TextEditor.tsx",
                        lineNumber: 334,
                        columnNumber: 11
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/src/components/TextEditor.tsx",
                    lineNumber: 333,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/src/components/TextEditor.tsx",
            lineNumber: 322,
            columnNumber: 7
        }, this);
    }
    return null;
}
// ── Font size menu ────────────────────────────────────────────────────────────
const FONT_LEVELS = [
    {
        label: 'Normal',
        size: '14px',
        cmd: '14px'
    },
    {
        label: 'Medium',
        size: '18px',
        cmd: '18px'
    },
    {
        label: 'Large',
        size: '22px',
        cmd: '22px'
    },
    {
        label: 'XL',
        size: '28px',
        cmd: '28px'
    },
    {
        label: 'XXL',
        size: '36px',
        cmd: '36px'
    }
];
function FontMenu({ onClose, onSelect }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        style: {
            position: 'absolute',
            top: 44,
            left: 0,
            zIndex: 100,
            background: 'var(--color-cortex-elevated)',
            border: '1px solid var(--color-cortex-border)',
            borderRadius: 10,
            padding: '6px 0',
            boxShadow: '0 8px 24px rgba(0,0,0,0.4)',
            minWidth: 140
        },
        children: FONT_LEVELS.map((f)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                onClick: ()=>{
                    onSelect(f);
                    onClose();
                },
                style: {
                    width: '100%',
                    textAlign: 'left',
                    padding: '7px 14px',
                    fontSize: f.size,
                    background: 'none',
                    border: 'none',
                    cursor: 'pointer',
                    color: 'var(--color-cortex-text)',
                    lineHeight: 1.2,
                    transition: 'background .1s'
                },
                onMouseEnter: (e)=>e.currentTarget.style.background = 'var(--color-cortex-surface)',
                onMouseLeave: (e)=>e.currentTarget.style.background = 'none',
                children: f.label
            }, f.label, false, {
                fileName: "[project]/src/components/TextEditor.tsx",
                lineNumber: 381,
                columnNumber: 9
            }, this))
    }, void 0, false, {
        fileName: "[project]/src/components/TextEditor.tsx",
        lineNumber: 375,
        columnNumber: 5
    }, this);
}
// ── SVG icon button ───────────────────────────────────────────────────────────
function IconBtn({ title, onClick, active, children }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
        onClick: onClick,
        title: title,
        style: {
            width: 32,
            height: 32,
            borderRadius: 7,
            flexShrink: 0,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            transition: 'all .15s',
            border: 'none',
            background: active ? 'var(--color-cortex-amberGlow)' : 'transparent',
            color: active ? 'var(--color-cortex-amber)' : 'var(--color-cortex-muted)'
        },
        children: children
    }, void 0, false, {
        fileName: "[project]/src/components/TextEditor.tsx",
        lineNumber: 400,
        columnNumber: 5
    }, this);
}
function TextEditor({ content, onChange, pages, currentPageIdx = 0, onAddPage, onSelectPage }) {
    const imgInputRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(null);
    const editorWrapRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(null);
    const [showTablePicker, setShowTablePicker] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const [showFontMenu, setShowFontMenu] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const [overlays, setOverlays] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])([]);
    const editor = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tiptap$2f$react$2f$dist$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["useEditor"])({
        extensions: [
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tiptap$2f$starter$2d$kit$2f$dist$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"],
            FontSize,
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tiptap$2f$extension$2d$image$2f$dist$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Image"],
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tiptap$2f$extension$2d$table$2f$dist$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Table"].configure({
                resizable: false
            }),
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tiptap$2f$extension$2d$table$2f$dist$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["TableRow"],
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tiptap$2f$extension$2d$table$2f$dist$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["TableHeader"],
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tiptap$2f$extension$2d$table$2f$dist$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["TableCell"]
        ],
        content,
        immediatelyRender: false,
        onUpdate: ({ editor })=>onChange(editor.getHTML()),
        editorProps: {
            attributes: {
                class: 'prose prose-invert max-w-none focus:outline-none py-8 min-h-[500px] cortex-editor'
            }
        }
    });
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        if (editor && editor.getHTML() !== content) {}
    }, [
        content,
        editor
    ]);
    // ── Overlay helpers ────────────────────────────────────────────────────────
    const addOverlay = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])((ov)=>{
        setOverlays((prev)=>[
                ...prev,
                {
                    ...ov,
                    id: Date.now()
                }
            ]);
    }, []);
    const removeOverlay = (id)=>setOverlays((prev)=>prev.filter((o)=>o.id !== id));
    const updateOverlay = (id, patch)=>setOverlays((prev)=>prev.map((o)=>o.id === id ? {
                    ...o,
                    ...patch
                } : o));
    // ── Handlers ───────────────────────────────────────────────────────────────
    const handleImageFile = (file)=>{
        const reader = new FileReader();
        reader.onload = (e)=>{
            const src = e.target?.result;
            const img = new window.Image();
            img.onload = ()=>{
                // cap to 400px wide max, preserve aspect ratio
                const maxW = 400;
                const w = Math.min(img.naturalWidth, maxW);
                const h = img.naturalHeight / img.naturalWidth * w;
                addOverlay({
                    type: 'image',
                    x: 60,
                    y: 60,
                    src,
                    imgWidth: w,
                    imgHeight: h
                });
            };
            img.src = src;
        };
        reader.readAsDataURL(file);
    };
    const handleInsertTable = (rows, cols)=>{
        editor?.chain().focus().insertTable({
            rows,
            cols,
            withHeaderRow: true
        }).run();
    };
    const handleFontSelect = (f)=>{
        if (f.cmd === '14px') {
            editor?.chain().focus().unsetFontSize().run();
        } else {
            editor?.chain().focus().setFontSize(f.cmd).run();
        }
    };
    const isBulletActive = editor?.isActive('bulletList') ?? false;
    const isHeadingActive = FONT_LEVELS.some((f)=>f.cmd !== '14px' && editor?.isActive('fontSize', {
            fontSize: f.cmd
        }));
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        style: {
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            overflow: 'hidden'
        },
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("style", {
                children: `
        .cortex-editor { font-size: 14px; line-height: 1.6; }
        .cortex-editor p { font-size: 14px; margin: 0 0 1em 0; }
        .cortex-editor h4 { font-size: 18px; font-weight: 600; margin: 1.2em 0 0.5em 0; line-height: 1.4; }
        .cortex-editor h3 { font-size: 22px; font-weight: 600; margin: 1.2em 0 0.5em 0; line-height: 1.3; }
        .cortex-editor h2 { font-size: 28px; font-weight: 700; margin: 1.2em 0 0.5em 0; line-height: 1.2; letter-spacing: -0.01em; }
        .cortex-editor h1 { font-size: 36px; font-weight: 800; margin: 1em 0 0.5em 0; line-height: 1.1; letter-spacing: -0.02em; }
        .cortex-editor ul { list-style-type: disc; margin-left: 1.5em; margin-bottom: 1em; }
        .cortex-editor li { margin-bottom: 0.25em; }
        .cortex-editor table { border-collapse: collapse; margin: 12px 0; }
        .cortex-editor td, .cortex-editor th { border: 1.5px solid #c8b89a; padding: 6px 10px; min-width: 60px; }
        .cortex-editor th { background: rgba(200,184,154,0.12); font-weight: 600; color: #d0cde8; }
        .cortex-editor td { color: #b8b5cc; }
      `
            }, void 0, false, {
                fileName: "[project]/src/components/TextEditor.tsx",
                lineNumber: 490,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                style: {
                    height: 44,
                    flexShrink: 0,
                    borderBottom: '1px solid var(--color-cortex-border)',
                    background: 'var(--color-cortex-sidebar)',
                    display: 'flex',
                    alignItems: 'center',
                    padding: '0 10px',
                    gap: 2
                },
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        style: {
                            position: 'relative'
                        },
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(IconBtn, {
                                title: "Font size",
                                active: showFontMenu || isHeadingActive,
                                onClick: ()=>{
                                    setShowFontMenu((v)=>!v);
                                    setShowTablePicker(false);
                                },
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    style: {
                                        fontSize: 13,
                                        fontWeight: 700,
                                        letterSpacing: -0.5
                                    },
                                    children: "Aa"
                                }, void 0, false, {
                                    fileName: "[project]/src/components/TextEditor.tsx",
                                    lineNumber: 516,
                                    columnNumber: 13
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/src/components/TextEditor.tsx",
                                lineNumber: 515,
                                columnNumber: 11
                            }, this),
                            showFontMenu && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(FontMenu, {
                                onClose: ()=>setShowFontMenu(false),
                                onSelect: handleFontSelect
                            }, void 0, false, {
                                fileName: "[project]/src/components/TextEditor.tsx",
                                lineNumber: 518,
                                columnNumber: 28
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/TextEditor.tsx",
                        lineNumber: 514,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        style: {
                            width: 1,
                            height: 20,
                            background: 'var(--color-cortex-border)',
                            margin: '0 4px'
                        }
                    }, void 0, false, {
                        fileName: "[project]/src/components/TextEditor.tsx",
                        lineNumber: 521,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(IconBtn, {
                        title: "Pin image",
                        onClick: ()=>imgInputRef.current?.click(),
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                            width: "15",
                            height: "15",
                            viewBox: "0 0 24 24",
                            fill: "none",
                            stroke: "currentColor",
                            strokeWidth: "2",
                            strokeLinecap: "round",
                            strokeLinejoin: "round",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                d: "M21.44 11.05l-9.19 9.19a6 6 0 01-8.49-8.49l9.19-9.19a4 4 0 015.66 5.66l-9.2 9.19a2 2 0 01-2.83-2.83l8.49-8.48"
                            }, void 0, false, {
                                fileName: "[project]/src/components/TextEditor.tsx",
                                lineNumber: 526,
                                columnNumber: 13
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/src/components/TextEditor.tsx",
                            lineNumber: 525,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/src/components/TextEditor.tsx",
                        lineNumber: 524,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                        ref: imgInputRef,
                        type: "file",
                        accept: "image/*",
                        style: {
                            display: 'none'
                        },
                        onChange: (e)=>{
                            const f = e.target.files?.[0];
                            if (f) handleImageFile(f);
                            e.target.value = '';
                        }
                    }, void 0, false, {
                        fileName: "[project]/src/components/TextEditor.tsx",
                        lineNumber: 529,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(IconBtn, {
                        title: "Add checklist",
                        active: false,
                        onClick: ()=>addOverlay({
                                type: 'bullets',
                                x: 80,
                                y: 80,
                                items: [
                                    {
                                        text: 'Item one',
                                        checked: false
                                    },
                                    {
                                        text: 'Item two',
                                        checked: false
                                    }
                                ]
                            }),
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                            width: "15",
                            height: "15",
                            viewBox: "0 0 24 24",
                            fill: "none",
                            stroke: "currentColor",
                            strokeWidth: "2",
                            strokeLinecap: "round",
                            strokeLinejoin: "round",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("circle", {
                                    cx: "6",
                                    cy: "7",
                                    r: "2.5"
                                }, void 0, false, {
                                    fileName: "[project]/src/components/TextEditor.tsx",
                                    lineNumber: 537,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("line", {
                                    x1: "11",
                                    y1: "7",
                                    x2: "21",
                                    y2: "7"
                                }, void 0, false, {
                                    fileName: "[project]/src/components/TextEditor.tsx",
                                    lineNumber: 537,
                                    columnNumber: 44
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("circle", {
                                    cx: "6",
                                    cy: "17",
                                    r: "2.5"
                                }, void 0, false, {
                                    fileName: "[project]/src/components/TextEditor.tsx",
                                    lineNumber: 538,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("line", {
                                    x1: "11",
                                    y1: "17",
                                    x2: "21",
                                    y2: "17"
                                }, void 0, false, {
                                    fileName: "[project]/src/components/TextEditor.tsx",
                                    lineNumber: 538,
                                    columnNumber: 45
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/components/TextEditor.tsx",
                            lineNumber: 536,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/src/components/TextEditor.tsx",
                        lineNumber: 534,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        style: {
                            position: 'relative'
                        },
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(IconBtn, {
                                title: "Insert table",
                                active: showTablePicker,
                                onClick: ()=>{
                                    setShowTablePicker((v)=>!v);
                                    setShowFontMenu(false);
                                },
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                                    width: "15",
                                    height: "15",
                                    viewBox: "0 0 24 24",
                                    fill: "none",
                                    stroke: "currentColor",
                                    strokeWidth: "2",
                                    strokeLinecap: "round",
                                    strokeLinejoin: "round",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("rect", {
                                            x: "3",
                                            y: "3",
                                            width: "18",
                                            height: "18",
                                            rx: "2"
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/TextEditor.tsx",
                                            lineNumber: 547,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("line", {
                                            x1: "3",
                                            y1: "9",
                                            x2: "21",
                                            y2: "9"
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/TextEditor.tsx",
                                            lineNumber: 548,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("line", {
                                            x1: "3",
                                            y1: "15",
                                            x2: "21",
                                            y2: "15"
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/TextEditor.tsx",
                                            lineNumber: 548,
                                            columnNumber: 51
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("line", {
                                            x1: "9",
                                            y1: "3",
                                            x2: "9",
                                            y2: "21"
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/TextEditor.tsx",
                                            lineNumber: 549,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("line", {
                                            x1: "15",
                                            y1: "3",
                                            x2: "15",
                                            y2: "21"
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/TextEditor.tsx",
                                            lineNumber: 549,
                                            columnNumber: 51
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/components/TextEditor.tsx",
                                    lineNumber: 546,
                                    columnNumber: 13
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/src/components/TextEditor.tsx",
                                lineNumber: 544,
                                columnNumber: 11
                            }, this),
                            showTablePicker && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(TablePicker, {
                                onPick: handleInsertTable,
                                onClose: ()=>setShowTablePicker(false)
                            }, void 0, false, {
                                fileName: "[project]/src/components/TextEditor.tsx",
                                lineNumber: 553,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/TextEditor.tsx",
                        lineNumber: 543,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        style: {
                            flex: 1
                        }
                    }, void 0, false, {
                        fileName: "[project]/src/components/TextEditor.tsx",
                        lineNumber: 557,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/TextEditor.tsx",
                lineNumber: 506,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                ref: editorWrapRef,
                style: {
                    flex: 1,
                    position: 'relative',
                    overflow: 'hidden'
                },
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        style: {
                            height: '100%',
                            overflowY: 'auto',
                            padding: '0 24px'
                        },
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tiptap$2f$react$2f$dist$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["EditorContent"], {
                            editor: editor
                        }, void 0, false, {
                            fileName: "[project]/src/components/TextEditor.tsx",
                            lineNumber: 563,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/src/components/TextEditor.tsx",
                        lineNumber: 562,
                        columnNumber: 9
                    }, this),
                    overlays.map((ov)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(OverlayItem, {
                            overlay: ov,
                            onRemove: ()=>removeOverlay(ov.id),
                            onUpdate: (patch)=>updateOverlay(ov.id, patch)
                        }, ov.id, false, {
                            fileName: "[project]/src/components/TextEditor.tsx",
                            lineNumber: 568,
                            columnNumber: 11
                        }, this))
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/TextEditor.tsx",
                lineNumber: 561,
                columnNumber: 7
            }, this),
            pages && onAddPage && onSelectPage && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(PageStrip, {
                pages: pages,
                currentIdx: currentPageIdx,
                onSelect: onSelectPage,
                onAdd: onAddPage
            }, void 0, false, {
                fileName: "[project]/src/components/TextEditor.tsx",
                lineNumber: 577,
                columnNumber: 9
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/TextEditor.tsx",
        lineNumber: 487,
        columnNumber: 5
    }, this);
}
}),
"[project]/src/components/CodeEditor.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>CodeEditor
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$monaco$2d$editor$2f$react$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/@monaco-editor/react/dist/index.mjs [app-ssr] (ecmascript) <locals>");
"use client";
;
;
function CodeEditor({ content, fileName, onChange }) {
    // Determine language based on extension
    let language = "javascript";
    if (fileName.endsWith('.py')) language = "python";
    if (fileName.endsWith('.m')) language = "matlab"; // Note: Monaco doesn't have default MATLAB, but it will try to syntax highlight
    if (fileName.endsWith('.sql')) language = "sql";
    if (fileName.endsWith('.html')) language = "html";
    if (fileName.endsWith('.css')) language = "css";
    if (fileName.endsWith('.ts') || fileName.endsWith('.tsx')) language = "typescript";
    const handleEditorWillMount = (monaco)=>{
        monaco.editor.defineTheme('cortex-dark', {
            base: 'vs-dark',
            inherit: true,
            rules: [
                {
                    token: 'keyword',
                    foreground: '9b7ff0',
                    fontStyle: 'bold'
                },
                {
                    token: 'type',
                    foreground: 'f09532',
                    fontStyle: 'bold'
                },
                {
                    token: 'string',
                    foreground: '4dba84'
                },
                {
                    token: 'number',
                    foreground: 'e07272'
                },
                {
                    token: 'identifier',
                    foreground: 'dddaeb'
                },
                {
                    token: 'comment',
                    foreground: '6a6780',
                    fontStyle: 'italic'
                },
                {
                    token: 'variable',
                    foreground: '6199f5'
                },
                {
                    token: 'function',
                    foreground: 'f09532'
                },
                {
                    token: 'class',
                    foreground: 'f09532',
                    fontStyle: 'bold'
                }
            ],
            colors: {
                'editor.background': '#07070a',
                'editor.foreground': '#dddaeb',
                'editorLineNumber.foreground': '#2e2c42',
                'editor.selectionBackground': '#17171f',
                'editor.lineHighlightBackground': '#111118',
                'editorCursor.foreground': '#f09532',
                'editorIndentGuide.background': '#111118',
                'editorIndentGuide.activeBackground': '#2e2c42'
            }
        });
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "flex-1 w-full h-full bg-[#07070a]",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$monaco$2d$editor$2f$react$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["default"], {
            height: "100%",
            defaultLanguage: language,
            language: language,
            value: content,
            theme: "cortex-dark",
            beforeMount: handleEditorWillMount,
            onChange: (val)=>onChange(val || ''),
            options: {
                fontFamily: "'JetBrains Mono', 'Courier New', monospace",
                fontSize: 14,
                minimap: {
                    enabled: false
                },
                padding: {
                    top: 24
                },
                lineHeight: 1.6,
                scrollBeyondLastLine: false,
                smoothScrolling: true,
                cursorBlinking: "smooth",
                cursorSmoothCaretAnimation: "on",
                renderLineHighlight: "all"
            }
        }, void 0, false, {
            fileName: "[project]/src/components/CodeEditor.tsx",
            lineNumber: 53,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/src/components/CodeEditor.tsx",
        lineNumber: 52,
        columnNumber: 5
    }, this);
}
}),
"[project]/src/components/FinanceEditor.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>FinanceEditor
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$chart$2f$PieChart$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/recharts/es6/chart/PieChart.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$polar$2f$Pie$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/recharts/es6/polar/Pie.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$component$2f$Cell$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/recharts/es6/component/Cell.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$component$2f$Tooltip$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/recharts/es6/component/Tooltip.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$component$2f$ResponsiveContainer$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/recharts/es6/component/ResponsiveContainer.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$component$2f$Legend$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/recharts/es6/component/Legend.js [app-ssr] (ecmascript)");
"use client";
;
;
;
function FinanceEditor({ content, onChange }) {
    const [data, setData] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])([]);
    // Parse initial content
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        try {
            if (content) {
                setData(JSON.parse(content));
            } else {
                setData([
                    {
                        id: 1,
                        category: "Rent",
                        amount: 12000
                    },
                    {
                        id: 2,
                        category: "Food",
                        amount: 5000
                    },
                    {
                        id: 3,
                        category: "Entertainment",
                        amount: 2000
                    }
                ]);
            }
        } catch (e) {
            setData([
                {
                    id: 1,
                    category: "Rent",
                    amount: 12000
                },
                {
                    id: 2,
                    category: "Food",
                    amount: 5000
                },
                {
                    id: 3,
                    category: "Entertainment",
                    amount: 2000
                }
            ]);
        }
    }, [
        content
    ]);
    const save = (newData)=>{
        setData(newData);
        onChange(JSON.stringify(newData));
    };
    const updateRow = (id, field, value)=>{
        const updated = data.map((row)=>{
            if (row.id === id) {
                return {
                    ...row,
                    [field]: value
                };
            }
            return row;
        });
        save(updated);
    };
    const addRow = ()=>{
        const newId = data.length > 0 ? Math.max(...data.map((d)=>d.id)) + 1 : 1;
        save([
            ...data,
            {
                id: newId,
                category: "New Item",
                amount: 0
            }
        ]);
    };
    const removeRow = (id)=>{
        save(data.filter((d)=>d.id !== id));
    };
    const COLORS = [
        '#6199f5',
        '#4dba84',
        '#f09532',
        '#9b7ff0',
        '#e07272',
        '#dddaeb'
    ];
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "flex-1 flex flex-col md:flex-row gap-8 p-8 bg-[var(--color-cortex-bg)] overflow-y-auto",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex-1 border border-[var(--color-cortex-border)] rounded-lg bg-[var(--color-cortex-surface)] overflow-hidden flex flex-col",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "p-4 border-b border-[var(--color-cortex-border)] flex justify-between items-center bg-[var(--color-cortex-elevated)]",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                className: "text-sm font-semibold text-[var(--color-cortex-text)]",
                                children: "Financial Ledger"
                            }, void 0, false, {
                                fileName: "[project]/src/components/FinanceEditor.tsx",
                                lineNumber: 73,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                onClick: addRow,
                                className: "text-xs bg-[var(--color-cortex-amberGlow)] text-[var(--color-cortex-amber)] px-3 py-1.5 rounded border border-[var(--color-cortex-amberBorder)] hover:opacity-80 transition",
                                children: "+ Add Row"
                            }, void 0, false, {
                                fileName: "[project]/src/components/FinanceEditor.tsx",
                                lineNumber: 74,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/FinanceEditor.tsx",
                        lineNumber: 72,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "p-4 flex-1 overflow-y-auto",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("table", {
                            className: "w-full text-sm text-left",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("thead", {
                                    className: "text-xs text-[var(--color-cortex-muted)] uppercase border-b border-[var(--color-cortex-border)]",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("tr", {
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                className: "px-4 py-3",
                                                children: "Category"
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/FinanceEditor.tsx",
                                                lineNumber: 86,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                className: "px-4 py-3",
                                                children: "Amount (₹)"
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/FinanceEditor.tsx",
                                                lineNumber: 87,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                className: "px-4 py-3 w-10"
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/FinanceEditor.tsx",
                                                lineNumber: 88,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/components/FinanceEditor.tsx",
                                        lineNumber: 85,
                                        columnNumber: 15
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/src/components/FinanceEditor.tsx",
                                    lineNumber: 84,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("tbody", {
                                    children: data.map((row)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("tr", {
                                            className: "border-b border-[var(--color-cortex-borderHover)] hover:bg-[var(--color-cortex-elevated)]",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                    className: "px-4 py-2",
                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                        type: "text",
                                                        value: row.category,
                                                        onChange: (e)=>updateRow(row.id, 'category', e.target.value),
                                                        className: "w-full bg-transparent border-none outline-none text-[var(--color-cortex-text)] focus:ring-1 focus:ring-[var(--color-cortex-amber)] rounded px-2 py-1"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/components/FinanceEditor.tsx",
                                                        lineNumber: 95,
                                                        columnNumber: 21
                                                    }, this)
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/FinanceEditor.tsx",
                                                    lineNumber: 94,
                                                    columnNumber: 19
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                    className: "px-4 py-2",
                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                        type: "number",
                                                        value: row.amount,
                                                        onChange: (e)=>updateRow(row.id, 'amount', Number(e.target.value)),
                                                        className: "w-full bg-transparent border-none outline-none text-[var(--color-cortex-text)] focus:ring-1 focus:ring-[var(--color-cortex-amber)] rounded px-2 py-1"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/components/FinanceEditor.tsx",
                                                        lineNumber: 103,
                                                        columnNumber: 21
                                                    }, this)
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/FinanceEditor.tsx",
                                                    lineNumber: 102,
                                                    columnNumber: 19
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                    className: "px-4 py-2 text-right",
                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                        onClick: ()=>removeRow(row.id),
                                                        className: "text-[var(--color-cortex-muted)] hover:text-[var(--color-cortex-red)] transition",
                                                        children: "×"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/components/FinanceEditor.tsx",
                                                        lineNumber: 111,
                                                        columnNumber: 21
                                                    }, this)
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/FinanceEditor.tsx",
                                                    lineNumber: 110,
                                                    columnNumber: 19
                                                }, this)
                                            ]
                                        }, row.id, true, {
                                            fileName: "[project]/src/components/FinanceEditor.tsx",
                                            lineNumber: 93,
                                            columnNumber: 17
                                        }, this))
                                }, void 0, false, {
                                    fileName: "[project]/src/components/FinanceEditor.tsx",
                                    lineNumber: 91,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/components/FinanceEditor.tsx",
                            lineNumber: 83,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/src/components/FinanceEditor.tsx",
                        lineNumber: 82,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/FinanceEditor.tsx",
                lineNumber: 71,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex-1 border border-[var(--color-cortex-border)] rounded-lg bg-[var(--color-cortex-surface)] p-6 flex flex-col items-center justify-center min-h-[400px]",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                        className: "text-sm font-medium text-[var(--color-cortex-muted)] mb-4",
                        children: "Spending Breakdown"
                    }, void 0, false, {
                        fileName: "[project]/src/components/FinanceEditor.tsx",
                        lineNumber: 127,
                        columnNumber: 9
                    }, this),
                    data.length > 0 && data.some((d)=>d.amount > 0) ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$component$2f$ResponsiveContainer$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ResponsiveContainer"], {
                        width: "100%",
                        height: 300,
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$chart$2f$PieChart$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["PieChart"], {
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$polar$2f$Pie$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Pie"], {
                                    data: data,
                                    cx: "50%",
                                    cy: "50%",
                                    innerRadius: 60,
                                    outerRadius: 100,
                                    paddingAngle: 5,
                                    dataKey: "amount",
                                    nameKey: "category",
                                    children: data.map((entry, index)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$component$2f$Cell$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Cell"], {
                                            fill: COLORS[index % COLORS.length]
                                        }, `cell-${index}`, false, {
                                            fileName: "[project]/src/components/FinanceEditor.tsx",
                                            lineNumber: 142,
                                            columnNumber: 19
                                        }, this))
                                }, void 0, false, {
                                    fileName: "[project]/src/components/FinanceEditor.tsx",
                                    lineNumber: 131,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$component$2f$Tooltip$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Tooltip"], {
                                    contentStyle: {
                                        backgroundColor: 'var(--color-cortex-elevated)',
                                        borderColor: 'var(--color-cortex-border)',
                                        color: 'var(--color-cortex-text)'
                                    },
                                    itemStyle: {
                                        color: 'var(--color-cortex-text)'
                                    }
                                }, void 0, false, {
                                    fileName: "[project]/src/components/FinanceEditor.tsx",
                                    lineNumber: 145,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$component$2f$Legend$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Legend"], {
                                    verticalAlign: "bottom",
                                    height: 36,
                                    wrapperStyle: {
                                        color: 'var(--color-cortex-text)'
                                    }
                                }, void 0, false, {
                                    fileName: "[project]/src/components/FinanceEditor.tsx",
                                    lineNumber: 149,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/components/FinanceEditor.tsx",
                            lineNumber: 130,
                            columnNumber: 13
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/src/components/FinanceEditor.tsx",
                        lineNumber: 129,
                        columnNumber: 11
                    }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "text-[var(--color-cortex-muted)] text-sm",
                        children: "Add data to see chart"
                    }, void 0, false, {
                        fileName: "[project]/src/components/FinanceEditor.tsx",
                        lineNumber: 153,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/FinanceEditor.tsx",
                lineNumber: 126,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/FinanceEditor.tsx",
        lineNumber: 69,
        columnNumber: 5
    }, this);
}
}),
"[project]/src/components/WhiteboardEditor.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>WhiteboardEditor
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
"use client";
;
;
function PageStrip({ pages, currentIdx, onSelect, onAdd }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        style: {
            height: 40,
            flexShrink: 0,
            borderTop: '1px solid var(--color-cortex-border)',
            background: 'var(--color-cortex-sidebar)',
            display: 'flex',
            alignItems: 'center',
            padding: '0 16px',
            gap: 4,
            overflowX: 'auto'
        },
        children: [
            pages.map((pg, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                    onClick: ()=>onSelect(i),
                    style: {
                        padding: '3px 14px',
                        borderRadius: 6,
                        fontSize: 11,
                        fontWeight: 500,
                        cursor: 'pointer',
                        transition: 'all .15s',
                        whiteSpace: 'nowrap',
                        background: currentIdx === i ? 'var(--color-cortex-amberGlow)' : 'transparent',
                        color: currentIdx === i ? 'var(--color-cortex-amber)' : 'var(--color-cortex-muted)',
                        border: currentIdx === i ? '1px solid var(--color-cortex-amberBorder)' : '1px solid transparent'
                    },
                    children: i + 1
                }, pg.id, false, {
                    fileName: "[project]/src/components/WhiteboardEditor.tsx",
                    lineNumber: 22,
                    columnNumber: 9
                }, this)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                onClick: onAdd,
                title: "Add page",
                style: {
                    marginLeft: 4,
                    width: 26,
                    height: 26,
                    borderRadius: 6,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: 16,
                    lineHeight: 1,
                    cursor: 'pointer',
                    flexShrink: 0,
                    background: 'transparent',
                    color: 'var(--color-cortex-muted)',
                    border: '1px dashed var(--color-cortex-border)',
                    transition: 'all .15s'
                },
                children: "+"
            }, void 0, false, {
                fileName: "[project]/src/components/WhiteboardEditor.tsx",
                lineNumber: 38,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/WhiteboardEditor.tsx",
        lineNumber: 14,
        columnNumber: 5
    }, this);
}
function OverlayItem({ overlay, onRemove, onUpdate }) {
    const containerRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(null);
    const dragRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(null);
    const resizeRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(null);
    const [mousePos, setMousePos] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null);
    const onPointerDown = (e)=>{
        if (e.target.closest('.no-drag')) return;
        e.stopPropagation();
        containerRef.current?.setPointerCapture(e.pointerId);
        dragRef.current = {
            ox: e.clientX - overlay.x,
            oy: e.clientY - overlay.y
        };
    };
    const startResize = (e, dir)=>{
        e.stopPropagation();
        containerRef.current?.setPointerCapture(e.pointerId);
        const w = overlay.imgWidth ?? 280;
        const h = overlay.imgHeight ?? 200;
        resizeRef.current = {
            dir,
            sx: e.clientX,
            sy: e.clientY,
            sw: w,
            sh: h,
            sox: overlay.x,
            soy: overlay.y,
            ar: w / h
        };
    };
    const onPointerMove = (e)=>{
        if (resizeRef.current) {
            const rs = resizeRef.current;
            const dx = e.clientX - rs.sx, dy = e.clientY - rs.sy;
            const MIN = 60;
            let nw = rs.sw, nh = rs.sh, nx = rs.sox, ny = rs.soy;
            switch(rs.dir){
                case 'se':
                    nw = Math.max(MIN, rs.sw + dx);
                    nh = nw / rs.ar;
                    break;
                case 'sw':
                    nw = Math.max(MIN, rs.sw - dx);
                    nh = nw / rs.ar;
                    nx = rs.sox + rs.sw - nw;
                    break;
                case 'ne':
                    nw = Math.max(MIN, rs.sw + dx);
                    nh = nw / rs.ar;
                    ny = rs.soy + rs.sh - nh;
                    break;
                case 'nw':
                    nw = Math.max(MIN, rs.sw - dx);
                    nh = nw / rs.ar;
                    nx = rs.sox + rs.sw - nw;
                    ny = rs.soy + rs.sh - nh;
                    break;
                case 'e':
                    nw = Math.max(MIN, rs.sw + dx);
                    break;
                case 'w':
                    nw = Math.max(MIN, rs.sw - dx);
                    nx = rs.sox + rs.sw - nw;
                    break;
                case 's':
                    nh = Math.max(MIN, rs.sh + dy);
                    break;
                case 'n':
                    nh = Math.max(MIN, rs.sh - dy);
                    ny = rs.soy + rs.sh - nh;
                    break;
            }
            onUpdate({
                imgWidth: nw,
                imgHeight: nh,
                x: nx,
                y: ny
            });
        } else if (dragRef.current) {
            onUpdate({
                x: e.clientX - dragRef.current.ox,
                y: e.clientY - dragRef.current.oy
            });
        }
    };
    const onPointerUp = ()=>{
        dragRef.current = null;
        resizeRef.current = null;
    };
    const base = {
        position: 'absolute',
        left: overlay.x,
        top: overlay.y,
        cursor: 'grab',
        userSelect: 'none',
        background: 'rgba(11,11,22,0.88)',
        backdropFilter: 'blur(8px)',
        border: '1px solid var(--color-cortex-border)',
        borderRadius: 10,
        padding: 10,
        minWidth: 120,
        boxShadow: '0 4px 16px rgba(0,0,0,0.5)'
    };
    const closeBtn = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
        className: "no-drag",
        onClick: onRemove,
        style: {
            position: 'absolute',
            top: -8,
            right: -8,
            width: 18,
            height: 18,
            borderRadius: '50%',
            background: 'var(--color-cortex-elevated)',
            border: '1px solid var(--color-cortex-border)',
            color: 'var(--color-cortex-muted)',
            fontSize: 11,
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            lineHeight: 1
        },
        children: "×"
    }, void 0, false, {
        fileName: "[project]/src/components/WhiteboardEditor.tsx",
        lineNumber: 139,
        columnNumber: 5
    }, this);
    // ── Resize handles ──
    const H = 8;
    const THRESH = 24;
    const near = (hx, hy)=>{
        if (!mousePos && !resizeRef.current) return false;
        if (resizeRef.current) return resizeRef.current.dir !== undefined;
        const dx = (mousePos?.x ?? 0) - hx, dy = (mousePos?.y ?? 0) - hy;
        return Math.sqrt(dx * dx + dy * dy) < THRESH;
    };
    const hStyle = (cursor, pos, hx, hy)=>({
            position: 'absolute',
            width: H,
            height: H,
            borderRadius: 2,
            background: '#d0cde8',
            border: '1px solid rgba(255,255,255,0.5)',
            cursor,
            zIndex: 30,
            transition: 'opacity .12s',
            opacity: near(hx, hy) ? 1 : 0,
            pointerEvents: near(hx, hy) ? 'auto' : 'none',
            ...pos
        });
    const mkH = (dir, cursor, pos, hx, hy)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "no-drag",
            style: hStyle(cursor, pos, hx, hy),
            onPointerDown: (e)=>startResize(e, dir)
        }, dir, false, {
            fileName: "[project]/src/components/WhiteboardEditor.tsx",
            lineNumber: 166,
            columnNumber: 5
        }, this);
    const resizeHandles = (w, h)=>{
        const m = -H / 2;
        return [
            mkH('nw', 'nwse-resize', {
                top: m,
                left: m
            }, 0, 0),
            mkH('n', 'ns-resize', {
                top: m,
                left: w / 2 + m
            }, w / 2, 0),
            mkH('ne', 'nesw-resize', {
                top: m,
                right: m
            }, w, 0),
            mkH('w', 'ew-resize', {
                top: h / 2 + m,
                left: m
            }, 0, h / 2),
            mkH('e', 'ew-resize', {
                top: h / 2 + m,
                right: m
            }, w, h / 2),
            mkH('sw', 'nesw-resize', {
                bottom: m,
                left: m
            }, 0, h),
            mkH('s', 'ns-resize', {
                bottom: m,
                left: w / 2 + m
            }, w / 2, h),
            mkH('se', 'nwse-resize', {
                bottom: m,
                right: m
            }, w, h)
        ];
    };
    if (overlay.type === 'image') {
        const imgW = overlay.imgWidth ?? 280;
        const imgH = overlay.imgHeight ?? 200;
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            ref: containerRef,
            style: {
                position: 'absolute',
                left: overlay.x,
                top: overlay.y,
                cursor: 'grab',
                userSelect: 'none',
                background: 'rgba(11,11,22,0.85)',
                backdropFilter: 'blur(8px)',
                border: '1px solid var(--color-cortex-border)',
                borderRadius: 10,
                padding: 6,
                boxShadow: '0 4px 16px rgba(0,0,0,0.5)',
                width: imgW + 12
            },
            onPointerDown: onPointerDown,
            onPointerMove: (e)=>{
                const rect = e.currentTarget.getBoundingClientRect();
                setMousePos({
                    x: e.clientX - rect.left - 6,
                    y: e.clientY - rect.top - 6
                });
                onPointerMove(e);
            },
            onPointerUp: onPointerUp,
            onMouseLeave: ()=>{
                if (!resizeRef.current) setMousePos(null);
            },
            children: [
                closeBtn,
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                    src: overlay.src,
                    alt: "pinned",
                    style: {
                        width: imgW,
                        height: imgH,
                        borderRadius: 6,
                        display: 'block',
                        objectFit: 'cover',
                        pointerEvents: 'none'
                    }
                }, void 0, false, {
                    fileName: "[project]/src/components/WhiteboardEditor.tsx",
                    lineNumber: 199,
                    columnNumber: 9
                }, this),
                resizeHandles(imgW, imgH)
            ]
        }, void 0, true, {
            fileName: "[project]/src/components/WhiteboardEditor.tsx",
            lineNumber: 181,
            columnNumber: 7
        }, this);
    }
    if (overlay.type === 'bullets') {
        const items = overlay.items ?? [];
        const toggleItem = (i)=>{
            const next = items.map((it, idx)=>idx === i ? {
                    ...it,
                    checked: !it.checked
                } : it);
            onUpdate({
                items: next
            });
        };
        const updateText = (i, text)=>{
            const next = items.map((it, idx)=>idx === i ? {
                    ...it,
                    text
                } : it);
            onUpdate({
                items: next
            });
        };
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            style: {
                ...base,
                minWidth: 220,
                padding: '12px 14px'
            },
            onPointerDown: onPointerDown,
            onPointerMove: onPointerMove,
            onPointerUp: onPointerUp,
            children: [
                closeBtn,
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    style: {
                        fontSize: 10,
                        color: '#9a9895',
                        fontWeight: 600,
                        letterSpacing: 1,
                        marginBottom: 10,
                        textTransform: 'uppercase'
                    },
                    children: "Checklist"
                }, void 0, false, {
                    fileName: "[project]/src/components/WhiteboardEditor.tsx",
                    lineNumber: 218,
                    columnNumber: 9
                }, this),
                items.map((item, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        style: {
                            display: 'flex',
                            alignItems: 'center',
                            gap: 10,
                            marginBottom: 8
                        },
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                className: "no-drag",
                                onClick: ()=>toggleItem(i),
                                style: {
                                    width: 18,
                                    height: 18,
                                    borderRadius: '50%',
                                    flexShrink: 0,
                                    cursor: 'pointer',
                                    background: item.checked ? '#e07272' : 'transparent',
                                    border: `2px solid ${item.checked ? '#e07272' : '#9a9895'}`,
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    fontSize: 9,
                                    color: '#fff',
                                    transition: 'all .15s'
                                },
                                children: item.checked ? '✓' : ''
                            }, void 0, false, {
                                fileName: "[project]/src/components/WhiteboardEditor.tsx",
                                lineNumber: 222,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                className: "no-drag",
                                value: item.text,
                                onChange: (e)=>updateText(i, e.target.value),
                                style: {
                                    background: 'transparent',
                                    border: 'none',
                                    outline: 'none',
                                    color: item.checked ? '#6a6780' : '#d0cde8',
                                    fontSize: 12,
                                    width: '100%',
                                    textDecoration: item.checked ? 'line-through' : 'none',
                                    transition: 'all .15s'
                                }
                            }, void 0, false, {
                                fileName: "[project]/src/components/WhiteboardEditor.tsx",
                                lineNumber: 233,
                                columnNumber: 13
                            }, this)
                        ]
                    }, i, true, {
                        fileName: "[project]/src/components/WhiteboardEditor.tsx",
                        lineNumber: 220,
                        columnNumber: 11
                    }, this)),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                    className: "no-drag",
                    onClick: ()=>onUpdate({
                            items: [
                                ...items,
                                {
                                    text: '',
                                    checked: false
                                }
                            ]
                        }),
                    style: {
                        fontSize: 11,
                        color: '#9a9895',
                        marginTop: 4,
                        cursor: 'pointer',
                        background: 'none',
                        border: 'none'
                    },
                    children: "+ Add item"
                }, void 0, false, {
                    fileName: "[project]/src/components/WhiteboardEditor.tsx",
                    lineNumber: 247,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/src/components/WhiteboardEditor.tsx",
            lineNumber: 216,
            columnNumber: 7
        }, this);
    }
    if (overlay.type === 'table') {
        const rows = overlay.rows ?? 3;
        const cols = overlay.cols ?? 3;
        const cells = overlay.cells ?? Array.from({
            length: rows
        }, ()=>Array(cols).fill(''));
        const borderColor = overlay.borderColor ?? '#c8b89a';
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            style: {
                ...base,
                padding: 0,
                overflow: 'visible'
            },
            onPointerDown: onPointerDown,
            onPointerMove: onPointerMove,
            onPointerUp: onPointerUp,
            children: [
                closeBtn,
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    style: {
                        display: 'flex',
                        alignItems: 'center',
                        gap: 6,
                        padding: '5px 8px',
                        borderBottom: `1px solid ${borderColor}`,
                        background: `${borderColor}22`
                    },
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                            style: {
                                fontSize: 9,
                                color: '#9a9895',
                                textTransform: 'uppercase',
                                letterSpacing: 1,
                                fontWeight: 600
                            },
                            children: "Border"
                        }, void 0, false, {
                            fileName: "[project]/src/components/WhiteboardEditor.tsx",
                            lineNumber: 270,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                            className: "no-drag",
                            type: "color",
                            value: borderColor,
                            onChange: (e)=>onUpdate({
                                    borderColor: e.target.value
                                }),
                            style: {
                                width: 18,
                                height: 18,
                                border: 'none',
                                borderRadius: 4,
                                cursor: 'pointer',
                                padding: 0,
                                background: 'transparent'
                            }
                        }, void 0, false, {
                            fileName: "[project]/src/components/WhiteboardEditor.tsx",
                            lineNumber: 271,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            style: {
                                width: 12,
                                height: 12,
                                borderRadius: 3,
                                background: borderColor,
                                border: '1px solid rgba(255,255,255,0.1)',
                                flexShrink: 0
                            }
                        }, void 0, false, {
                            fileName: "[project]/src/components/WhiteboardEditor.tsx",
                            lineNumber: 278,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/components/WhiteboardEditor.tsx",
                    lineNumber: 265,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("table", {
                    style: {
                        borderCollapse: 'collapse',
                        fontSize: 11
                    },
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("tbody", {
                        children: Array.from({
                            length: rows
                        }, (_, r)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("tr", {
                                children: Array.from({
                                    length: cols
                                }, (_, c)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                        style: {
                                            border: `1px solid ${borderColor}`,
                                            padding: 0
                                        },
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                            className: "no-drag",
                                            value: cells[r]?.[c] ?? '',
                                            onChange: (e)=>{
                                                const next = cells.map((row)=>[
                                                        ...row
                                                    ]);
                                                next[r][c] = e.target.value;
                                                onUpdate({
                                                    cells: next
                                                });
                                            },
                                            style: {
                                                background: r === 0 ? `${borderColor}28` : 'transparent',
                                                border: 'none',
                                                outline: 'none',
                                                padding: '5px 8px',
                                                color: r === 0 ? '#d0cde8' : '#b8b5cc',
                                                fontWeight: r === 0 ? 600 : 400,
                                                fontSize: 11,
                                                width: 80
                                            }
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/WhiteboardEditor.tsx",
                                            lineNumber: 286,
                                            columnNumber: 21
                                        }, this)
                                    }, c, false, {
                                        fileName: "[project]/src/components/WhiteboardEditor.tsx",
                                        lineNumber: 285,
                                        columnNumber: 19
                                    }, this))
                            }, r, false, {
                                fileName: "[project]/src/components/WhiteboardEditor.tsx",
                                lineNumber: 283,
                                columnNumber: 15
                            }, this))
                    }, void 0, false, {
                        fileName: "[project]/src/components/WhiteboardEditor.tsx",
                        lineNumber: 281,
                        columnNumber: 11
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/src/components/WhiteboardEditor.tsx",
                    lineNumber: 280,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/src/components/WhiteboardEditor.tsx",
            lineNumber: 262,
            columnNumber: 7
        }, this);
    }
    return null;
}
function WhiteboardEditor({ content, onChange, pages, currentPageIdx = 0, onAddPage, onSelectPage, currentBgType = 'dotted', onChangeBgType }) {
    const containerRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(null);
    const mainCanvasRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(null);
    const laserCanvasRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(null);
    const [tool, setTool] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])("pen");
    const [color, setColor] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])("#f09532");
    // bgType is now per-page, driven by props
    const bgType = currentBgType;
    const setBgType = (t)=>onChangeBgType?.(t);
    // Overlays: positioned HTML elements on top of canvas
    const [overlays, setOverlays] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])([]);
    const imgPinRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(null);
    const addOverlay = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])((ov)=>{
        setOverlays((prev)=>[
                ...prev,
                {
                    ...ov,
                    id: Date.now()
                }
            ]);
    }, []);
    const removeOverlay = (id)=>setOverlays((prev)=>prev.filter((o)=>o.id !== id));
    const updateOverlay = (id, patch)=>setOverlays((prev)=>prev.map((o)=>o.id === id ? {
                    ...o,
                    ...patch
                } : o));
    const handlePinImage = (file)=>{
        const reader = new FileReader();
        reader.onload = (e)=>{
            const src = e.target?.result;
            const img = new window.Image();
            img.onload = ()=>{
                const maxW = 400;
                const w = Math.min(img.naturalWidth, maxW);
                const h = img.naturalHeight / img.naturalWidth * w;
                addOverlay({
                    type: 'image',
                    x: 80,
                    y: 80,
                    src,
                    imgWidth: w,
                    imgHeight: h
                });
            };
            img.src = src;
        };
        reader.readAsDataURL(file);
    };
    const handleAddBullets = ()=>addOverlay({
            type: 'bullets',
            x: 80,
            y: 80,
            items: [
                {
                    text: 'Item one',
                    checked: false
                },
                {
                    text: 'Item two',
                    checked: false
                }
            ]
        });
    const handleAddTable = ()=>addOverlay({
            type: 'table',
            x: 80,
            y: 80,
            rows: 3,
            cols: 3,
            cells: Array.from({
                length: 3
            }, ()=>Array(3).fill('')),
            borderColor: '#c8b89a'
        });
    // State to hold saved strokes
    const [strokes, setStrokes] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])([]);
    const currentStrokeRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(null);
    const isDrawingRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(false);
    // Laser state
    const laserPointsRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])([]);
    const animationFrameRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(null);
    // Load initial content
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        if (content) {
            try {
                const parsed = JSON.parse(content);
                if (Array.isArray(parsed)) {
                    setStrokes(parsed);
                }
            } catch (e) {
            // ignore
            }
        }
    }, []);
    // Save content
    const saveStrokes = (newStrokes)=>{
        setStrokes(newStrokes);
        onChange(JSON.stringify(newStrokes));
    };
    // Handle Resize
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        const handleResize = ()=>{
            if (containerRef.current && mainCanvasRef.current && laserCanvasRef.current) {
                const { clientWidth, clientHeight } = containerRef.current;
                mainCanvasRef.current.width = clientWidth;
                mainCanvasRef.current.height = clientHeight;
                laserCanvasRef.current.width = clientWidth;
                laserCanvasRef.current.height = clientHeight;
                redrawMainCanvas();
            }
        };
        window.addEventListener("resize", handleResize);
        handleResize(); // Initial size
        return ()=>window.removeEventListener("resize", handleResize);
    }, [
        strokes
    ]); // Re-draw on resize
    const redrawMainCanvas = ()=>{
        const canvas = mainCanvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext("2d");
        if (!ctx) return;
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.lineCap = "round";
        ctx.lineJoin = "round";
        ctx.lineWidth = 3;
        strokes.forEach((stroke)=>{
            if (stroke.points.length === 0) return;
            ctx.strokeStyle = stroke.color;
            ctx.beginPath();
            ctx.moveTo(stroke.points[0].x, stroke.points[0].y);
            stroke.points.forEach((p)=>ctx.lineTo(p.x, p.y));
            ctx.stroke();
        });
    };
    // Main render loop for the laser
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        const renderLaser = ()=>{
            const canvas = laserCanvasRef.current;
            const ctx = canvas?.getContext("2d");
            if (canvas && ctx) {
                ctx.clearRect(0, 0, canvas.width, canvas.height);
                const now = Date.now();
                // Remove points older than 500ms
                laserPointsRef.current = laserPointsRef.current.filter((p)=>now - p.timestamp < 500);
                if (laserPointsRef.current.length > 0) {
                    ctx.lineCap = "round";
                    ctx.lineJoin = "round";
                    for(let i = 1; i < laserPointsRef.current.length; i++){
                        const p1 = laserPointsRef.current[i - 1];
                        const p2 = laserPointsRef.current[i];
                        const age = now - p2.timestamp;
                        const opacity = Math.max(0, 1 - age / 500);
                        ctx.beginPath();
                        ctx.moveTo(p1.x, p1.y);
                        ctx.lineTo(p2.x, p2.y);
                        ctx.strokeStyle = `rgba(240, 50, 50, ${opacity})`; // Red laser color
                        ctx.lineWidth = 6 * opacity + 2; // Thicker at the front
                        ctx.stroke();
                        // Add a glow effect
                        ctx.shadowColor = 'rgba(240, 50, 50, 1)';
                        ctx.shadowBlur = 10;
                        ctx.stroke();
                        ctx.shadowBlur = 0; // reset
                    }
                }
            }
            animationFrameRef.current = requestAnimationFrame(renderLaser);
        };
        renderLaser();
        return ()=>{
            if (animationFrameRef.current) cancelAnimationFrame(animationFrameRef.current);
        };
    }, []);
    const getCoordinates = (e)=>{
        const rect = containerRef.current?.getBoundingClientRect();
        if (!rect) return {
            x: 0,
            y: 0
        };
        return {
            x: e.clientX - rect.left,
            y: e.clientY - rect.top
        };
    };
    const handlePointerDown = (e)=>{
        isDrawingRef.current = true;
        const { x, y } = getCoordinates(e);
        if (tool === "pen") {
            currentStrokeRef.current = {
                color,
                points: [
                    {
                        x,
                        y
                    }
                ]
            };
        } else if (tool === "laser") {
            laserPointsRef.current.push({
                x,
                y,
                timestamp: Date.now()
            });
        }
        // Capture pointer to track outside bounds temporarily
        e.target.setPointerCapture(e.pointerId);
    };
    const handlePointerMove = (e)=>{
        if (!isDrawingRef.current) return;
        const { x, y } = getCoordinates(e);
        if (tool === "pen" && currentStrokeRef.current) {
            currentStrokeRef.current.points.push({
                x,
                y
            });
            // Draw live on main canvas
            const ctx = mainCanvasRef.current?.getContext("2d");
            if (ctx) {
                ctx.lineCap = "round";
                ctx.lineJoin = "round";
                ctx.lineWidth = 3;
                ctx.strokeStyle = color;
                const points = currentStrokeRef.current.points;
                const last = points[points.length - 2];
                const current = points[points.length - 1];
                if (last && current) {
                    ctx.beginPath();
                    ctx.moveTo(last.x, last.y);
                    ctx.lineTo(current.x, current.y);
                    ctx.stroke();
                }
            }
        } else if (tool === "laser") {
            laserPointsRef.current.push({
                x,
                y,
                timestamp: Date.now()
            });
        }
    };
    const handlePointerUp = (e)=>{
        isDrawingRef.current = false;
        e.target.releasePointerCapture(e.pointerId);
        if (tool === "pen" && currentStrokeRef.current) {
            saveStrokes([
                ...strokes,
                currentStrokeRef.current
            ]);
            currentStrokeRef.current = null;
        }
    };
    // Background styling
    const bgStyles = {
        dotted: {
            backgroundImage: 'radial-gradient(circle, var(--color-cortex-muted) 1px, transparent 1px)',
            backgroundSize: '24px 24px'
        },
        lined: {
            backgroundImage: 'linear-gradient(transparent 95%, var(--color-cortex-borderHover) 5%)',
            backgroundSize: '100% 32px'
        },
        plain: {
            background: 'transparent'
        },
        white: {
            background: '#ffffff'
        }
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "flex-1 flex flex-col bg-[#080810]",
        style: {
            overflow: 'hidden'
        },
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "h-14 border-b border-[var(--color-cortex-border)] bg-[var(--color-cortex-sidebar)] flex items-center px-4 gap-6 shrink-0",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex gap-2",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                onClick: ()=>setTool("pen"),
                                className: `px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${tool === "pen" ? 'bg-[var(--color-cortex-amberGlow)] text-[var(--color-cortex-amber)] border border-[var(--color-cortex-amberBorder)]' : 'text-[var(--color-cortex-muted)] hover:text-[var(--color-cortex-text)]'}`,
                                children: "✎ Pen"
                            }, void 0, false, {
                                fileName: "[project]/src/components/WhiteboardEditor.tsx",
                                lineNumber: 566,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                onClick: ()=>setTool("laser"),
                                className: `px-3 py-1.5 rounded-md text-sm font-medium transition-colors flex items-center gap-2 ${tool === "laser" ? 'bg-red-500/10 text-red-400 border border-red-500/30' : 'text-[var(--color-cortex-muted)] hover:text-[var(--color-cortex-text)]'}`,
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "w-2 h-2 rounded-full bg-red-500 shadow-[0_0_8px_rgba(239,68,68,0.8)]"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/WhiteboardEditor.tsx",
                                        lineNumber: 576,
                                        columnNumber: 13
                                    }, this),
                                    "Laser"
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/WhiteboardEditor.tsx",
                                lineNumber: 572,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/WhiteboardEditor.tsx",
                        lineNumber: 565,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "w-px h-6 bg-[var(--color-cortex-border)]"
                    }, void 0, false, {
                        fileName: "[project]/src/components/WhiteboardEditor.tsx",
                        lineNumber: 581,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex items-center gap-3",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "text-xs text-[var(--color-cortex-muted)] uppercase tracking-wide",
                                children: "Color"
                            }, void 0, false, {
                                fileName: "[project]/src/components/WhiteboardEditor.tsx",
                                lineNumber: 584,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                type: "color",
                                value: color,
                                onChange: (e)=>setColor(e.target.value),
                                disabled: tool === "laser",
                                className: `w-7 h-7 rounded cursor-pointer border-0 p-0 outline-none bg-transparent ${tool === 'laser' ? 'opacity-30' : ''}`,
                                style: {
                                    WebkitAppearance: 'none'
                                }
                            }, void 0, false, {
                                fileName: "[project]/src/components/WhiteboardEditor.tsx",
                                lineNumber: 585,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/WhiteboardEditor.tsx",
                        lineNumber: 583,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "w-px h-6 bg-[var(--color-cortex-border)]"
                    }, void 0, false, {
                        fileName: "[project]/src/components/WhiteboardEditor.tsx",
                        lineNumber: 595,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex items-center gap-2",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "text-xs text-[var(--color-cortex-muted)] uppercase tracking-wide mr-2",
                                children: "Paper"
                            }, void 0, false, {
                                fileName: "[project]/src/components/WhiteboardEditor.tsx",
                                lineNumber: 598,
                                columnNumber: 11
                            }, this),
                            [
                                "dotted",
                                "lined",
                                "plain",
                                "white"
                            ].map((type)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    onClick: ()=>setBgType(type),
                                    className: `px-3 py-1 rounded text-xs capitalize transition-colors ${bgType === type ? 'bg-[var(--color-cortex-surface)] text-[var(--color-cortex-text)] border border-[var(--color-cortex-border)]' : 'text-[var(--color-cortex-muted)] hover:text-[var(--color-cortex-text)]'}`,
                                    children: type
                                }, type, false, {
                                    fileName: "[project]/src/components/WhiteboardEditor.tsx",
                                    lineNumber: 600,
                                    columnNumber: 13
                                }, this))
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/WhiteboardEditor.tsx",
                        lineNumber: 597,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "w-px h-6 bg-[var(--color-cortex-border)]"
                    }, void 0, false, {
                        fileName: "[project]/src/components/WhiteboardEditor.tsx",
                        lineNumber: 610,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex gap-1 items-center",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                onClick: ()=>imgPinRef.current?.click(),
                                title: "Pin image",
                                className: "w-8 h-8 rounded-md flex items-center justify-center transition-colors text-[var(--color-cortex-muted)] hover:text-[var(--color-cortex-text)] hover:bg-[var(--color-cortex-surface)]",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                                    width: "16",
                                    height: "16",
                                    viewBox: "0 0 24 24",
                                    fill: "none",
                                    stroke: "currentColor",
                                    strokeWidth: "2",
                                    strokeLinecap: "round",
                                    strokeLinejoin: "round",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                        d: "M21.44 11.05l-9.19 9.19a6 6 0 01-8.49-8.49l9.19-9.19a4 4 0 015.66 5.66l-9.2 9.19a2 2 0 01-2.83-2.83l8.49-8.48"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/WhiteboardEditor.tsx",
                                        lineNumber: 621,
                                        columnNumber: 15
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/src/components/WhiteboardEditor.tsx",
                                    lineNumber: 620,
                                    columnNumber: 13
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/src/components/WhiteboardEditor.tsx",
                                lineNumber: 615,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                ref: imgPinRef,
                                type: "file",
                                accept: "image/*",
                                style: {
                                    display: 'none'
                                },
                                onChange: (e)=>{
                                    const f = e.target.files?.[0];
                                    if (f) handlePinImage(f);
                                    e.target.value = '';
                                }
                            }, void 0, false, {
                                fileName: "[project]/src/components/WhiteboardEditor.tsx",
                                lineNumber: 624,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                onClick: handleAddBullets,
                                title: "Add checklist",
                                className: "w-8 h-8 rounded-md flex items-center justify-center transition-colors text-[var(--color-cortex-muted)] hover:text-[var(--color-cortex-text)] hover:bg-[var(--color-cortex-surface)]",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                                    width: "16",
                                    height: "16",
                                    viewBox: "0 0 24 24",
                                    fill: "none",
                                    stroke: "currentColor",
                                    strokeWidth: "2",
                                    strokeLinecap: "round",
                                    strokeLinejoin: "round",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("circle", {
                                            cx: "6",
                                            cy: "7",
                                            r: "2.5"
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/WhiteboardEditor.tsx",
                                            lineNumber: 634,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("line", {
                                            x1: "11",
                                            y1: "7",
                                            x2: "21",
                                            y2: "7"
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/WhiteboardEditor.tsx",
                                            lineNumber: 634,
                                            columnNumber: 46
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("circle", {
                                            cx: "6",
                                            cy: "17",
                                            r: "2.5"
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/WhiteboardEditor.tsx",
                                            lineNumber: 635,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("line", {
                                            x1: "11",
                                            y1: "17",
                                            x2: "21",
                                            y2: "17"
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/WhiteboardEditor.tsx",
                                            lineNumber: 635,
                                            columnNumber: 47
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/components/WhiteboardEditor.tsx",
                                    lineNumber: 633,
                                    columnNumber: 13
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/src/components/WhiteboardEditor.tsx",
                                lineNumber: 628,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                onClick: handleAddTable,
                                title: "Add table",
                                className: "w-8 h-8 rounded-md flex items-center justify-center transition-colors text-[var(--color-cortex-muted)] hover:text-[var(--color-cortex-text)] hover:bg-[var(--color-cortex-surface)]",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                                    width: "16",
                                    height: "16",
                                    viewBox: "0 0 24 24",
                                    fill: "none",
                                    stroke: "currentColor",
                                    strokeWidth: "2",
                                    strokeLinecap: "round",
                                    strokeLinejoin: "round",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("rect", {
                                            x: "3",
                                            y: "3",
                                            width: "18",
                                            height: "18",
                                            rx: "2"
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/WhiteboardEditor.tsx",
                                            lineNumber: 646,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("line", {
                                            x1: "3",
                                            y1: "9",
                                            x2: "21",
                                            y2: "9"
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/WhiteboardEditor.tsx",
                                            lineNumber: 647,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("line", {
                                            x1: "3",
                                            y1: "15",
                                            x2: "21",
                                            y2: "15"
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/WhiteboardEditor.tsx",
                                            lineNumber: 647,
                                            columnNumber: 51
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("line", {
                                            x1: "9",
                                            y1: "3",
                                            x2: "9",
                                            y2: "21"
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/WhiteboardEditor.tsx",
                                            lineNumber: 648,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("line", {
                                            x1: "15",
                                            y1: "3",
                                            x2: "15",
                                            y2: "21"
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/WhiteboardEditor.tsx",
                                            lineNumber: 648,
                                            columnNumber: 51
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/components/WhiteboardEditor.tsx",
                                    lineNumber: 645,
                                    columnNumber: 13
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/src/components/WhiteboardEditor.tsx",
                                lineNumber: 640,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/WhiteboardEditor.tsx",
                        lineNumber: 613,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex-1"
                    }, void 0, false, {
                        fileName: "[project]/src/components/WhiteboardEditor.tsx",
                        lineNumber: 653,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        onClick: ()=>saveStrokes([]),
                        className: "text-xs text-[var(--color-cortex-muted)] hover:text-[var(--color-cortex-red)] transition-colors px-3 py-1 border border-transparent hover:border-[var(--color-cortex-border)] rounded",
                        children: "Clear Board"
                    }, void 0, false, {
                        fileName: "[project]/src/components/WhiteboardEditor.tsx",
                        lineNumber: 655,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/WhiteboardEditor.tsx",
                lineNumber: 564,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                ref: containerRef,
                className: "flex-1 relative overflow-hidden",
                style: bgStyles[bgType],
                onPointerDown: handlePointerDown,
                onPointerMove: handlePointerMove,
                onPointerUp: handlePointerUp,
                onPointerCancel: handlePointerUp,
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("canvas", {
                        ref: mainCanvasRef,
                        className: "absolute inset-0 w-full h-full touch-none"
                    }, void 0, false, {
                        fileName: "[project]/src/components/WhiteboardEditor.tsx",
                        lineNumber: 673,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("canvas", {
                        ref: laserCanvasRef,
                        className: "absolute inset-0 w-full h-full touch-none pointer-events-none"
                    }, void 0, false, {
                        fileName: "[project]/src/components/WhiteboardEditor.tsx",
                        lineNumber: 677,
                        columnNumber: 9
                    }, this),
                    overlays.map((ov)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(OverlayItem, {
                            overlay: ov,
                            onRemove: ()=>removeOverlay(ov.id),
                            onUpdate: (patch)=>updateOverlay(ov.id, patch)
                        }, ov.id, false, {
                            fileName: "[project]/src/components/WhiteboardEditor.tsx",
                            lineNumber: 681,
                            columnNumber: 11
                        }, this))
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/WhiteboardEditor.tsx",
                lineNumber: 664,
                columnNumber: 7
            }, this),
            pages && onAddPage && onSelectPage && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(PageStrip, {
                pages: pages,
                currentIdx: currentPageIdx,
                onSelect: onSelectPage,
                onAdd: onAddPage
            }, void 0, false, {
                fileName: "[project]/src/components/WhiteboardEditor.tsx",
                lineNumber: 685,
                columnNumber: 9
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/WhiteboardEditor.tsx",
        lineNumber: 562,
        columnNumber: 5
    }, this);
}
}),
"[project]/src/components/DynamicCanvas.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>DynamicCanvas,
    "getFileType",
    ()=>getFileType
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$TextEditor$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/TextEditor.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$CodeEditor$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/CodeEditor.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$FinanceEditor$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/FinanceEditor.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$WhiteboardEditor$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/WhiteboardEditor.tsx [app-ssr] (ecmascript)");
"use client";
;
;
;
;
;
function getFileType(name) {
    const lower = name.toLowerCase();
    if (lower.includes("finance") || lower.endsWith(".csv") || lower.endsWith(".xlsx")) {
        return "finance";
    }
    if (lower.endsWith(".canvas") || lower.endsWith(".board")) {
        return "whiteboard";
    }
    if (lower.endsWith(".js") || lower.endsWith(".jsx") || lower.endsWith(".ts") || lower.endsWith(".tsx") || lower.endsWith(".py") || lower.endsWith(".m") || lower.endsWith(".sql") || lower.endsWith(".html") || lower.endsWith(".css")) {
        return "code";
    }
    return "text";
}
function DynamicCanvas({ file, onChange, pages, currentPageIdx = 0, onAddPage, onSelectPage, currentBgType, onChangeBgType }) {
    const fileType = getFileType(file.name);
    const handleUpdate = (newContent)=>{
        onChange(file.id, newContent);
    };
    if (fileType === "finance") {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$FinanceEditor$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
            content: file.content,
            onChange: handleUpdate
        }, void 0, false, {
            fileName: "[project]/src/components/DynamicCanvas.tsx",
            lineNumber: 60,
            columnNumber: 12
        }, this);
    }
    if (fileType === "whiteboard") {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$WhiteboardEditor$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
            content: file.content,
            onChange: handleUpdate,
            pages: pages,
            currentPageIdx: currentPageIdx,
            onAddPage: onAddPage,
            onSelectPage: onSelectPage,
            currentBgType: currentBgType,
            onChangeBgType: onChangeBgType
        }, void 0, false, {
            fileName: "[project]/src/components/DynamicCanvas.tsx",
            lineNumber: 65,
            columnNumber: 7
        }, this);
    }
    if (fileType === "code") {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$CodeEditor$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
            content: file.content,
            fileName: file.name,
            onChange: handleUpdate
        }, void 0, false, {
            fileName: "[project]/src/components/DynamicCanvas.tsx",
            lineNumber: 79,
            columnNumber: 12
        }, this);
    }
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$TextEditor$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
        content: file.content,
        onChange: handleUpdate,
        pages: pages,
        currentPageIdx: currentPageIdx,
        onAddPage: onAddPage,
        onSelectPage: onSelectPage
    }, void 0, false, {
        fileName: "[project]/src/components/DynamicCanvas.tsx",
        lineNumber: 83,
        columnNumber: 5
    }, this);
}
}),
"[project]/src/lib/similarity.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "extractKeywords",
    ()=>extractKeywords,
    "getProject",
    ()=>getProject,
    "getRelatedFiles",
    ()=>getRelatedFiles,
    "jaccard",
    ()=>jaccard
]);
const STOPWORDS = new Set([
    'the',
    'and',
    'for',
    'are',
    'but',
    'not',
    'you',
    'all',
    'can',
    'had',
    'was',
    'one',
    'our',
    'out',
    'day',
    'get',
    'has',
    'him',
    'his',
    'how',
    'now',
    'see',
    'say',
    'she',
    'too',
    'use',
    'that',
    'this',
    'with',
    'have',
    'from',
    'they',
    'will',
    'been',
    'into',
    'more',
    'also',
    'than',
    'then',
    'when',
    'your',
    'each',
    'like',
    'make',
    'many',
    'over',
    'time',
    'very',
    'what',
    'which',
    'would',
    'about',
    'after',
    'could',
    'first',
    'other',
    'right',
    'think',
    'those',
    'where',
    'while',
    'data',
    'file',
    'note'
]);
function extractKeywords(content) {
    const text = content.replace(/<[^>]+>/g, ' ').replace(/[{}[\]",:=+\-*/<>!();@#$%^&|]/g, ' ');
    const words = text.toLowerCase().split(/\s+/).map((w)=>w.replace(/[^a-z]/g, '')).filter((w)=>w.length > 4 && !STOPWORDS.has(w));
    return new Set(words);
}
function jaccard(a, b) {
    if (a.size === 0 && b.size === 0) return 0;
    let inter = 0;
    for (const w of a)if (b.has(w)) inter++;
    const union = a.size + b.size - inter;
    return union === 0 ? 0 : inter / union;
}
function getProject(name) {
    return name.replace(/\.[^.]+$/, '').split(/[_\-\s]/)[0].toLowerCase();
}
function getRelatedFiles(activeId, files, fileType, limit = 4) {
    const active = files.find((f)=>f.id === activeId);
    if (!active) return [];
    const activeKw = extractKeywords(active.content);
    const activeProject = getProject(active.name);
    const activeType = fileType(active.name);
    const scored = files.filter((f)=>f.id !== activeId).map((f)=>{
        const fKw = extractKeywords(f.content);
        const fProject = getProject(f.name);
        const fType = fileType(f.name);
        const sim = jaccard(activeKw, fKw);
        const sharedTopics = [
            ...activeKw
        ].filter((w)=>fKw.has(w)).slice(0, 3);
        let score = sim * 4; // keyword similarity (scaled)
        let reason = sharedTopics.length > 0 ? `Topics: ${sharedTopics.join(', ')}` : '';
        // Project match bonus
        if (fProject === activeProject && fProject.length > 1) {
            score = Math.max(score, 0.9);
            reason = `Project: ${fProject}`;
        }
        // Type bridge
        if (!reason) {
            if (activeType === 'finance' && fType === 'text' || activeType === 'text' && fType === 'finance') {
                score = Math.max(score, 0.25);
                reason = 'Finance ↔ Notes';
            }
            if (activeType === 'code' && fType === 'whiteboard' || activeType === 'whiteboard' && fType === 'code') {
                score = Math.max(score, 0.3);
                reason = 'Code ↔ Diagram';
            }
        }
        return {
            id: f.id,
            name: f.name,
            score: Math.min(score, 1),
            reason,
            sharedTopics
        };
    }).filter((r)=>r.score > 0.15).sort((a, b)=>b.score - a.score).slice(0, limit);
    return scored;
}
}),
"[project]/src/components/ConsciousnessView.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>ConsciousnessView
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$DynamicCanvas$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/DynamicCanvas.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$similarity$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/similarity.ts [app-ssr] (ecmascript)");
"use client";
;
;
;
;
const TYPE_COLORS = {
    text: '#6199f5',
    code: '#9b7ff0',
    finance: '#4dba84',
    whiteboard: '#f09532'
};
function computeAutoEdges(nodes) {
    const edges = [];
    const seen = new Set();
    for(let i = 0; i < nodes.length; i++){
        for(let j = i + 1; j < nodes.length; j++){
            const a = nodes[i], b = nodes[j];
            const key = [
                a.id,
                b.id
            ].sort().join('|');
            if (seen.has(key)) continue;
            let best = {
                strength: 0,
                reason: ''
            };
            if (a.project === b.project && a.project.length > 1) best = {
                strength: 0.9,
                reason: `Project: ${a.project}`
            };
            const sim = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$similarity$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jaccard"])(a.keywords, b.keywords);
            if (sim > 0.05 && sim * 4 > best.strength) {
                const shared = [
                    ...a.keywords
                ].filter((w)=>b.keywords.has(w)).slice(0, 3);
                best = {
                    strength: Math.min(0.95, sim * 4),
                    reason: `Topics: ${shared.join(', ')}`
                };
            }
            if (a.type === 'finance' && b.type === 'text' || a.type === 'text' && b.type === 'finance') {
                if (0.3 > best.strength) best = {
                    strength: 0.3,
                    reason: 'Finance ↔ Notes'
                };
            }
            if (a.type === 'code' && b.type === 'whiteboard' || a.type === 'whiteboard' && b.type === 'code') {
                if (0.35 > best.strength) best = {
                    strength: 0.35,
                    reason: 'Code ↔ Diagram'
                };
            }
            if (best.strength > 0) {
                seen.add(key);
                edges.push({
                    from: a.id,
                    to: b.id,
                    ...best,
                    manual: false,
                    color: 'rgba(255,255,255,0.35)'
                });
            }
        }
    }
    return edges;
}
// ── LINK COLORS ────────────────────────────────────────────────────────────
const LINK_COLORS = [
    '#f09532',
    '#6199f5',
    '#9b7ff0',
    '#4dba84',
    '#e07272',
    '#ffffff'
];
function ConsciousnessView({ files, activeFileId, onSelectFile }) {
    const containerRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(null);
    const animRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(null);
    const nodesRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])([]);
    const dragRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(null);
    const isSimRunning = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(false);
    const [dims, setDims] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])({
        w: 800,
        h: 600
    });
    const [renderNodes, setRenderNodes] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])([]);
    const [autoEdges, setAutoEdges] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])([]);
    const [manualEdges, setManualEdges] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])([]);
    const [hovered, setHovered] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null);
    const [tooltip, setTooltip] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null);
    const [linkMode, setLinkMode] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const [linkFirst, setLinkFirst] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null);
    const [linkColor, setLinkColor] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])('#f09532');
    const [hovEdgeIdx, setHovEdgeIdx] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null);
    // Resize observer
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        const el = containerRef.current;
        if (!el) return;
        const ro = new ResizeObserver(()=>setDims({
                w: el.clientWidth,
                h: el.clientHeight
            }));
        ro.observe(el);
        setDims({
            w: el.clientWidth,
            h: el.clientHeight
        });
        return ()=>ro.disconnect();
    }, []);
    // Build nodes when files change
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        const next = files.map((f, i)=>{
            const ex = nodesRef.current.find((n)=>n.id === f.id);
            const angle = 2 * Math.PI * i / files.length;
            const rad = Math.min(dims.w, dims.h) * 0.28;
            const type = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$DynamicCanvas$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getFileType"])(f.name);
            return {
                id: f.id,
                label: f.name,
                type,
                project: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$similarity$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getProject"])(f.name),
                x: ex?.x ?? dims.w / 2 + rad * Math.cos(angle),
                y: ex?.y ?? dims.h / 2 + rad * Math.sin(angle),
                vx: ex?.vx ?? 0,
                vy: ex?.vy ?? 0,
                color: TYPE_COLORS[type] || '#6199f5',
                keywords: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$similarity$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["extractKeywords"])(f.content)
            };
        });
        nodesRef.current = next;
        setRenderNodes([
            ...next
        ]);
        setAutoEdges(computeAutoEdges(next));
    }, [
        files,
        dims
    ]);
    // Physics sim
    const startSim = ()=>{
        if (isSimRunning.current) return;
        isSimRunning.current = true;
        const { w, h } = dims;
        const allEdges = [
            ...autoEdges,
            ...manualEdges
        ];
        const tick = ()=>{
            const ns = nodesRef.current;
            for(let i = 0; i < ns.length; i++){
                if (dragRef.current?.id === ns[i].id) continue;
                for(let j = i + 1; j < ns.length; j++){
                    if (dragRef.current?.id === ns[j].id) continue;
                    const dx = ns[j].x - ns[i].x, dy = ns[j].y - ns[i].y;
                    const dist = Math.sqrt(dx * dx + dy * dy) || 1;
                    const force = 4000 / (dist * dist);
                    ns[i].vx -= dx / dist * force;
                    ns[i].vy -= dy / dist * force;
                    ns[j].vx += dx / dist * force;
                    ns[j].vy += dy / dist * force;
                }
            }
            for (const e of allEdges){
                const a = ns.find((n)=>n.id === e.from), b = ns.find((n)=>n.id === e.to);
                if (!a || !b) continue;
                if (dragRef.current?.id === a.id || dragRef.current?.id === b.id) continue;
                const dx = b.x - a.x, dy = b.y - a.y;
                const dist = Math.sqrt(dx * dx + dy * dy) || 1;
                const target = e.manual ? 150 : 220 - e.strength * 80;
                const diff = (dist - target) * 0.015;
                a.vx += dx / dist * diff;
                a.vy += dy / dist * diff;
                b.vx -= dx / dist * diff;
                b.vy -= dy / dist * diff;
            }
            for (const n of ns){
                if (dragRef.current?.id === n.id) continue;
                n.vx += (w / 2 - n.x) * 0.002;
                n.vy += (h / 2 - n.y) * 0.002;
                n.vx *= 0.82;
                n.vy *= 0.82;
                n.x = Math.max(20, Math.min(w - 20, n.x + n.vx));
                n.y = Math.max(20, Math.min(h - 20, n.y + n.vy));
            }
            setRenderNodes([
                ...ns
            ]);
            animRef.current = requestAnimationFrame(tick);
        };
        animRef.current = requestAnimationFrame(tick);
        setTimeout(()=>{
            if (animRef.current) {
                cancelAnimationFrame(animRef.current);
                isSimRunning.current = false;
            }
        }, 4000);
    };
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        startSim();
        return ()=>{
            if (animRef.current) cancelAnimationFrame(animRef.current);
            isSimRunning.current = false;
        };
    }, [
        autoEdges,
        manualEdges,
        dims
    ]);
    // ── Drag handlers ──────────────────────────────────────────────────────────
    const getSVGPos = (e)=>{
        const rect = containerRef.current?.getBoundingClientRect();
        if (!rect) return {
            x: 0,
            y: 0
        };
        return {
            x: e.clientX - rect.left,
            y: e.clientY - rect.top
        };
    };
    const onNodePointerDown = (e, id)=>{
        if (linkMode) return;
        e.stopPropagation();
        e.currentTarget.setPointerCapture(e.pointerId);
        const { x, y } = getSVGPos(e);
        const node = nodesRef.current.find((n)=>n.id === id);
        dragRef.current = {
            id,
            ox: x - node.x,
            oy: y - node.y
        };
    };
    const onSVGPointerMove = (e)=>{
        if (!dragRef.current) return;
        const { x, y } = getSVGPos(e);
        const node = nodesRef.current.find((n)=>n.id === dragRef.current.id);
        if (!node) return;
        node.x = x - dragRef.current.ox;
        node.y = y - dragRef.current.oy;
        setRenderNodes([
            ...nodesRef.current
        ]);
    };
    const onSVGPointerUp = ()=>{
        dragRef.current = null;
        startSim();
    };
    // ── Node click (link mode) ─────────────────────────────────────────────────
    const onNodeClick = (id)=>{
        if (!linkMode) {
            onSelectFile(id);
            return;
        }
        if (!linkFirst) {
            setLinkFirst(id);
            return;
        }
        if (linkFirst !== id) {
            const key = [
                linkFirst,
                id
            ].sort().join('|');
            const dup = manualEdges.some((e)=>[
                    e.from,
                    e.to
                ].sort().join('|') === key);
            if (!dup) {
                setManualEdges((prev)=>[
                        ...prev,
                        {
                            from: linkFirst,
                            to: id,
                            strength: 1,
                            reason: 'Manual',
                            manual: true,
                            color: linkColor
                        }
                    ]);
            }
        }
        setLinkFirst(null);
    };
    const removeManualEdge = (idx)=>setManualEdges((prev)=>prev.filter((_, i)=>i !== idx));
    const allEdges = [
        ...autoEdges,
        ...manualEdges
    ];
    const nodeMap = Object.fromEntries(renderNodes.map((n)=>[
            n.id,
            n
        ]));
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        ref: containerRef,
        className: "flex-1 relative overflow-hidden select-none",
        style: {
            background: '#050508'
        },
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                style: {
                    position: 'absolute',
                    inset: 0,
                    width: '100%',
                    height: '100%',
                    opacity: 0.2,
                    pointerEvents: 'none'
                },
                children: Array.from({
                    length: 80
                }, (_, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("circle", {
                        cx: `${i * 137.5 % 100}%`,
                        cy: `${i * 61.8 % 100}%`,
                        r: i % 3 === 0 ? 1.2 : 0.5,
                        fill: "white"
                    }, i, false, {
                        fileName: "[project]/src/components/ConsciousnessView.tsx",
                        lineNumber: 226,
                        columnNumber: 11
                    }, this))
            }, void 0, false, {
                fileName: "[project]/src/components/ConsciousnessView.tsx",
                lineNumber: 224,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                style: {
                    position: 'absolute',
                    top: 16,
                    left: '50%',
                    transform: 'translateX(-50%)',
                    zIndex: 10,
                    display: 'flex',
                    gap: 8,
                    alignItems: 'center',
                    background: 'rgba(11,11,15,0.92)',
                    backdropFilter: 'blur(12px)',
                    border: '1px solid rgba(255,255,255,0.08)',
                    borderRadius: 12,
                    padding: '8px 16px'
                },
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        style: {
                            fontSize: 11,
                            fontWeight: 700,
                            color: '#dddaeb',
                            letterSpacing: 1.5
                        },
                        children: "CONSCIOUSNESS"
                    }, void 0, false, {
                        fileName: "[project]/src/components/ConsciousnessView.tsx",
                        lineNumber: 238,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        style: {
                            width: 1,
                            height: 16,
                            background: 'rgba(255,255,255,0.08)'
                        }
                    }, void 0, false, {
                        fileName: "[project]/src/components/ConsciousnessView.tsx",
                        lineNumber: 239,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        onClick: ()=>{
                            setLinkMode((v)=>!v);
                            setLinkFirst(null);
                        },
                        style: {
                            padding: '4px 12px',
                            borderRadius: 7,
                            fontSize: 11,
                            fontWeight: 500,
                            cursor: 'pointer',
                            transition: 'all .2s',
                            background: linkMode ? 'rgba(240,149,50,0.15)' : 'transparent',
                            color: linkMode ? '#f09532' : '#6a6780',
                            border: linkMode ? '1px solid rgba(240,149,50,0.3)' : '1px solid rgba(255,255,255,0.06)'
                        },
                        children: linkMode ? linkFirst ? '● Click 2nd node' : '○ Click 1st node' : '⊕ Draw Link'
                    }, void 0, false, {
                        fileName: "[project]/src/components/ConsciousnessView.tsx",
                        lineNumber: 242,
                        columnNumber: 9
                    }, this),
                    linkMode && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        style: {
                            display: 'flex',
                            gap: 5,
                            alignItems: 'center'
                        },
                        children: LINK_COLORS.map((c)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                onClick: ()=>setLinkColor(c),
                                style: {
                                    width: linkColor === c ? 18 : 12,
                                    height: linkColor === c ? 18 : 12,
                                    borderRadius: '50%',
                                    background: c,
                                    border: linkColor === c ? `2px solid white` : 'none',
                                    cursor: 'pointer',
                                    transition: 'all .15s',
                                    flexShrink: 0
                                }
                            }, c, false, {
                                fileName: "[project]/src/components/ConsciousnessView.tsx",
                                lineNumber: 255,
                                columnNumber: 15
                            }, this))
                    }, void 0, false, {
                        fileName: "[project]/src/components/ConsciousnessView.tsx",
                        lineNumber: 253,
                        columnNumber: 11
                    }, this),
                    linkMode && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        onClick: ()=>{
                            setLinkMode(false);
                            setLinkFirst(null);
                        },
                        style: {
                            fontSize: 11,
                            color: '#6a6780',
                            cursor: 'pointer',
                            background: 'none',
                            border: 'none'
                        },
                        children: "✕ Cancel"
                    }, void 0, false, {
                        fileName: "[project]/src/components/ConsciousnessView.tsx",
                        lineNumber: 264,
                        columnNumber: 22
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/ConsciousnessView.tsx",
                lineNumber: 232,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                width: "100%",
                height: "100%",
                onPointerMove: onSVGPointerMove,
                onPointerUp: onSVGPointerUp,
                onPointerCancel: onSVGPointerUp,
                style: {
                    cursor: linkMode ? 'crosshair' : 'default'
                },
                children: [
                    allEdges.map((e, i)=>{
                        const a = nodeMap[e.from], b = nodeMap[e.to];
                        if (!a || !b) return null;
                        const isHl = hovEdgeIdx?.idx === i || hovered === e.from || hovered === e.to;
                        const midX = (a.x + b.x) / 2, midY = (a.y + b.y) / 2;
                        const edgeType = i < autoEdges.length ? 'auto' : 'manual';
                        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("g", {
                            onMouseEnter: ()=>setHovEdgeIdx({
                                    type: edgeType,
                                    idx: i
                                }),
                            onMouseLeave: ()=>setHovEdgeIdx(null),
                            onDoubleClick: ()=>e.manual && removeManualEdge(i - autoEdges.length),
                            style: {
                                cursor: e.manual ? 'pointer' : 'default'
                            },
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("line", {
                                    x1: a.x,
                                    y1: a.y,
                                    x2: b.x,
                                    y2: b.y,
                                    stroke: "transparent",
                                    strokeWidth: 10
                                }, void 0, false, {
                                    fileName: "[project]/src/components/ConsciousnessView.tsx",
                                    lineNumber: 289,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("line", {
                                    x1: a.x,
                                    y1: a.y,
                                    x2: b.x,
                                    y2: b.y,
                                    stroke: e.manual ? e.color : isHl ? '#ffffff' : 'rgba(255,255,255,0.15)',
                                    strokeWidth: isHl ? 1.5 : e.manual ? 1.2 : 0.7,
                                    strokeDasharray: e.manual ? 'none' : '4 6',
                                    opacity: isHl ? 1 : e.manual ? 0.7 : 0.5,
                                    style: {
                                        transition: 'all .2s'
                                    }
                                }, void 0, false, {
                                    fileName: "[project]/src/components/ConsciousnessView.tsx",
                                    lineNumber: 290,
                                    columnNumber: 15
                                }, this),
                                isHl && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("text", {
                                    x: midX,
                                    y: midY - 7,
                                    textAnchor: "middle",
                                    fontSize: "9",
                                    fill: e.manual ? e.color : '#8888aa',
                                    fontFamily: "'DM Sans', system-ui",
                                    style: {
                                        pointerEvents: 'none'
                                    },
                                    children: e.manual ? `✦ ${e.reason}` : `${e.reason} · ${Math.round(e.strength * 100)}%`
                                }, void 0, false, {
                                    fileName: "[project]/src/components/ConsciousnessView.tsx",
                                    lineNumber: 298,
                                    columnNumber: 17
                                }, this)
                            ]
                        }, `${edgeType}-${i}`, true, {
                            fileName: "[project]/src/components/ConsciousnessView.tsx",
                            lineNumber: 283,
                            columnNumber: 13
                        }, this);
                    }),
                    linkMode && linkFirst && (()=>{
                        const fn = nodeMap[linkFirst];
                        return fn ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("circle", {
                            cx: fn.x,
                            cy: fn.y,
                            r: 14,
                            fill: linkColor,
                            opacity: 0.2,
                            className: "pulse-ring"
                        }, void 0, false, {
                            fileName: "[project]/src/components/ConsciousnessView.tsx",
                            lineNumber: 312,
                            columnNumber: 13
                        }, this) : null;
                    })(),
                    renderNodes.map((n)=>{
                        const isHov = hovered === n.id;
                        const isActive = n.id === activeFileId;
                        const isFirst = n.id === linkFirst;
                        const DOT_R = 7;
                        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("g", {
                            style: {
                                cursor: linkMode ? 'crosshair' : dragRef.current?.id === n.id ? 'grabbing' : 'grab'
                            },
                            onMouseEnter: ()=>setHovered(n.id),
                            onMouseLeave: ()=>setHovered(null),
                            onPointerDown: (e)=>onNodePointerDown(e, n.id),
                            onClick: ()=>onNodeClick(n.id),
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("circle", {
                                    cx: n.x,
                                    cy: n.y,
                                    r: DOT_R * 3.5,
                                    fill: n.color,
                                    opacity: isHov || isActive ? 0.12 : 0.04,
                                    style: {
                                        transition: 'opacity .25s'
                                    }
                                }, void 0, false, {
                                    fileName: "[project]/src/components/ConsciousnessView.tsx",
                                    lineNumber: 333,
                                    columnNumber: 15
                                }, this),
                                (isActive || isFirst) && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("circle", {
                                    cx: n.x,
                                    cy: n.y,
                                    r: DOT_R,
                                    fill: isFirst ? linkColor : n.color,
                                    opacity: 0.2,
                                    className: "pulse-ring"
                                }, void 0, false, {
                                    fileName: "[project]/src/components/ConsciousnessView.tsx",
                                    lineNumber: 339,
                                    columnNumber: 17
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("circle", {
                                    cx: n.x,
                                    cy: n.y,
                                    r: isHov || isActive ? DOT_R + 2 : DOT_R,
                                    fill: isActive ? n.color : isFirst ? linkColor : n.color,
                                    stroke: isFirst ? linkColor : n.color,
                                    strokeWidth: isActive || isFirst ? 2 : 1,
                                    opacity: isHov || isActive || isFirst ? 1 : 0.75,
                                    style: {
                                        transition: 'r .15s, opacity .15s'
                                    }
                                }, void 0, false, {
                                    fileName: "[project]/src/components/ConsciousnessView.tsx",
                                    lineNumber: 344,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, n.id, true, {
                            fileName: "[project]/src/components/ConsciousnessView.tsx",
                            lineNumber: 325,
                            columnNumber: 13
                        }, this);
                    })
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/ConsciousnessView.tsx",
                lineNumber: 269,
                columnNumber: 7
            }, this),
            hovered && (()=>{
                const n = nodeMap[hovered];
                if (!n) return null;
                const kws = [
                    ...n.keywords
                ].slice(0, 5);
                return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    style: {
                        position: 'absolute',
                        left: n.x + 16,
                        top: n.y - 12,
                        pointerEvents: 'none',
                        zIndex: 20,
                        background: 'rgba(11,11,15,0.95)',
                        backdropFilter: 'blur(10px)',
                        border: `1px solid ${n.color}40`,
                        borderRadius: 10,
                        padding: '10px 14px',
                        minWidth: 160,
                        maxWidth: 240
                    },
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            style: {
                                display: 'flex',
                                alignItems: 'center',
                                gap: 6,
                                marginBottom: 6
                            },
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    style: {
                                        width: 8,
                                        height: 8,
                                        borderRadius: '50%',
                                        background: n.color,
                                        flexShrink: 0
                                    }
                                }, void 0, false, {
                                    fileName: "[project]/src/components/ConsciousnessView.tsx",
                                    lineNumber: 370,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    style: {
                                        fontSize: 13,
                                        fontWeight: 600,
                                        color: '#dddaeb',
                                        wordBreak: 'break-all'
                                    },
                                    children: n.label
                                }, void 0, false, {
                                    fileName: "[project]/src/components/ConsciousnessView.tsx",
                                    lineNumber: 371,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/components/ConsciousnessView.tsx",
                            lineNumber: 369,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            style: {
                                fontSize: 10,
                                color: '#6a6780',
                                textTransform: 'uppercase',
                                letterSpacing: 1,
                                marginBottom: 4
                            },
                            children: n.type
                        }, void 0, false, {
                            fileName: "[project]/src/components/ConsciousnessView.tsx",
                            lineNumber: 373,
                            columnNumber: 13
                        }, this),
                        kws.length > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            style: {
                                display: 'flex',
                                flexWrap: 'wrap',
                                gap: 4
                            },
                            children: kws.map((w)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    style: {
                                        fontSize: 10,
                                        padding: '1px 6px',
                                        borderRadius: 8,
                                        background: `${n.color}18`,
                                        color: n.color,
                                        border: `1px solid ${n.color}30`
                                    },
                                    children: w
                                }, w, false, {
                                    fileName: "[project]/src/components/ConsciousnessView.tsx",
                                    lineNumber: 379,
                                    columnNumber: 19
                                }, this))
                        }, void 0, false, {
                            fileName: "[project]/src/components/ConsciousnessView.tsx",
                            lineNumber: 377,
                            columnNumber: 15
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            style: {
                                fontSize: 10,
                                color: '#6a6780',
                                marginTop: 6
                            },
                            children: linkMode ? 'Click to link' : 'Click to open · Drag to move'
                        }, void 0, false, {
                            fileName: "[project]/src/components/ConsciousnessView.tsx",
                            lineNumber: 386,
                            columnNumber: 13
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/components/ConsciousnessView.tsx",
                    lineNumber: 362,
                    columnNumber: 11
                }, this);
            })(),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                style: {
                    position: 'absolute',
                    bottom: 20,
                    left: 20,
                    background: 'rgba(11,11,15,0.88)',
                    backdropFilter: 'blur(8px)',
                    border: '1px solid rgba(255,255,255,0.06)',
                    borderRadius: 10,
                    padding: '12px 14px',
                    fontSize: 11,
                    color: '#6a6780'
                },
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        style: {
                            fontWeight: 600,
                            color: '#dddaeb',
                            marginBottom: 8
                        },
                        children: "Node types"
                    }, void 0, false, {
                        fileName: "[project]/src/components/ConsciousnessView.tsx",
                        lineNumber: 400,
                        columnNumber: 9
                    }, this),
                    Object.entries(TYPE_COLORS).map(([type, color])=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            style: {
                                display: 'flex',
                                alignItems: 'center',
                                gap: 8,
                                marginBottom: 5
                            },
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    style: {
                                        width: 7,
                                        height: 7,
                                        borderRadius: '50%',
                                        background: color
                                    }
                                }, void 0, false, {
                                    fileName: "[project]/src/components/ConsciousnessView.tsx",
                                    lineNumber: 403,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    style: {
                                        textTransform: 'capitalize'
                                    },
                                    children: type
                                }, void 0, false, {
                                    fileName: "[project]/src/components/ConsciousnessView.tsx",
                                    lineNumber: 404,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, type, true, {
                            fileName: "[project]/src/components/ConsciousnessView.tsx",
                            lineNumber: 402,
                            columnNumber: 11
                        }, this)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        style: {
                            borderTop: '1px solid rgba(255,255,255,0.06)',
                            marginTop: 8,
                            paddingTop: 8
                        },
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            children: "Dbl-click manual edge to remove"
                        }, void 0, false, {
                            fileName: "[project]/src/components/ConsciousnessView.tsx",
                            lineNumber: 408,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/src/components/ConsciousnessView.tsx",
                        lineNumber: 407,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/ConsciousnessView.tsx",
                lineNumber: 394,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                style: {
                    position: 'absolute',
                    bottom: 20,
                    right: 20,
                    background: 'rgba(11,11,15,0.88)',
                    backdropFilter: 'blur(8px)',
                    border: '1px solid rgba(255,255,255,0.06)',
                    borderRadius: 10,
                    padding: '10px 14px',
                    fontSize: 11,
                    color: '#6a6780'
                },
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        style: {
                            color: '#dddaeb',
                            fontWeight: 600
                        },
                        children: renderNodes.length
                    }, void 0, false, {
                        fileName: "[project]/src/components/ConsciousnessView.tsx",
                        lineNumber: 419,
                        columnNumber: 9
                    }, this),
                    "nodes  · ",
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        style: {
                            color: '#dddaeb',
                            fontWeight: 600
                        },
                        children: autoEdges.length
                    }, void 0, false, {
                        fileName: "[project]/src/components/ConsciousnessView.tsx",
                        lineNumber: 420,
                        columnNumber: 9
                    }, this),
                    "auto  · ",
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        style: {
                            color: '#f09532',
                            fontWeight: 600
                        },
                        children: manualEdges.length
                    }, void 0, false, {
                        fileName: "[project]/src/components/ConsciousnessView.tsx",
                        lineNumber: 421,
                        columnNumber: 9
                    }, this),
                    " manual"
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/ConsciousnessView.tsx",
                lineNumber: 413,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/ConsciousnessView.tsx",
        lineNumber: 221,
        columnNumber: 5
    }, this);
}
}),
"[project]/src/app/page.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>Home
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$DynamicCanvas$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/DynamicCanvas.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ConsciousnessView$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/ConsciousnessView.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$similarity$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/similarity.ts [app-ssr] (ecmascript)");
"use client";
;
;
;
;
;
// ── localStorage helpers ───────────────────────────────────────────────────────
const STORAGE_KEY = "cortex_workspace_files";
const PAGES_KEY = "cortex_pages_map";
function saveToStorage(files, pagesMap) {
    try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(files));
        localStorage.setItem(PAGES_KEY, JSON.stringify(pagesMap));
    } catch  {}
}
// ── Default files shown on first ever load ────────────────────────────────────
const DEFAULT_FILES = [
    {
        id: '1',
        name: 'Ideas.txt',
        content: '<p> </p>'
    },
    {
        id: '2',
        name: 'script.m',
        content: '% MATLAB script\nx = linspace(0, 2*pi, 100);\ny = sin(x);\nplot(x, y);'
    },
    {
        id: '3',
        name: 'Q2_Finance.csv',
        content: '[{"id":1,"category":"Rent","amount":12000},{"id":2,"category":"Food","amount":5000},{"id":3,"category":"Software","amount":800}]'
    }
];
function Home() {
    // Always start with DEFAULT_FILES so server + client render identically.
    // After hydration, the useEffect below overwrites with whatever is in localStorage.
    const [files, setFiles] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(DEFAULT_FILES);
    const [pagesMap, setPagesMap] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])({});
    const [pageIdxMap, setPageIdxMap] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])({});
    const [activeFileId, setActiveFileId] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])('1');
    const [section, setSection] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])('files');
    const [focusMode, setFocusMode] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const [saveFlash, setSaveFlash] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    // Tracks whether the initial localStorage load has completed.
    // Prevents the default files from being written back to localStorage
    // before we've had a chance to read what's already stored there.
    const hasLoaded = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(false);
    // Load persisted data from localStorage after first render (client-only).
    // This runs once on mount and is invisible to the server — no hydration mismatch.
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        try {
            const rawFiles = localStorage.getItem(STORAGE_KEY);
            const rawPages = localStorage.getItem(PAGES_KEY);
            if (rawFiles) {
                const stored = JSON.parse(rawFiles);
                if (stored.length > 0) {
                    setFiles(stored);
                    setActiveFileId(stored[0].id);
                }
            }
            if (rawPages) {
                setPagesMap(JSON.parse(rawPages));
            }
        } catch  {}
        // Mark load as complete — auto-save effects below will now run
        hasLoaded.current = true;
    }, []);
    // Auto-save the file LIST whenever it changes (handles delete, create, rename).
    // Content (pagesMap) is only saved when the user clicks the Save button.
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        if (!hasLoaded.current) return; // skip the initial render with DEFAULT_FILES
        try {
            localStorage.setItem(STORAGE_KEY, JSON.stringify(files));
        } catch  {}
    }, [
        files
    ]);
    const activeFile = files.find((f)=>f.id === activeFileId) || files[0];
    const relatedFiles = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useMemo"])(()=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$similarity$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getRelatedFiles"])(activeFileId, files, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$DynamicCanvas$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getFileType"], 4), [
        activeFileId,
        files
    ]);
    // ── Save button handler ───────────────────────────────────────────────────
    const handleSave = ()=>{
        saveToStorage(files, pagesMap);
        setSaveFlash(true);
        setTimeout(()=>setSaveFlash(false), 1800);
    };
    // ── Pages helpers ─────────────────────────────────────────────────────────
    const getPages = (fileId, fallbackContent)=>pagesMap[fileId] ?? [
            {
                id: 1,
                content: fallbackContent
            }
        ];
    const getCurrentPageIdx = (fileId)=>pageIdxMap[fileId] ?? 0;
    const handleAddPage = (fileId, fallbackContent)=>{
        const existing = getPages(fileId, fallbackContent);
        const updated = [
            ...existing,
            {
                id: Date.now(),
                content: '',
                bgType: 'dotted'
            }
        ];
        setPagesMap((prev)=>({
                ...prev,
                [fileId]: updated
            }));
        setPageIdxMap((prev)=>({
                ...prev,
                [fileId]: updated.length - 1
            }));
    };
    const handleSelectPage = (fileId, idx)=>{
        setPageIdxMap((prev)=>({
                ...prev,
                [fileId]: idx
            }));
    };
    const handleChangeBgType = (fileId, idx, bgType)=>{
        const existing = pagesMap[fileId];
        if (!existing) return;
        const updated = existing.map((p, i)=>i === idx ? {
                ...p,
                bgType
            } : p);
        setPagesMap((prev)=>({
                ...prev,
                [fileId]: updated
            }));
    };
    // ── File CRUD ─────────────────────────────────────────────────────────────
    const handleCreateFile = ()=>{
        const newFile = {
            id: Date.now().toString(),
            name: 'Untitled.txt',
            content: ''
        };
        setFiles([
            ...files,
            newFile
        ]);
        setActiveFileId(newFile.id);
        setSection('files');
    };
    const handleUpdateFileName = (id, newName)=>{
        setFiles(files.map((f)=>f.id === id ? {
                ...f,
                name: newName
            } : f));
    };
    const handleUpdateFileContent = (id, newContent)=>{
        setFiles(files.map((f)=>f.id === id ? {
                ...f,
                content: newContent
            } : f));
    };
    const handleDeleteFile = (id)=>{
        const remaining = files.filter((f)=>f.id !== id);
        setFiles(remaining);
        if (activeFileId === id) {
            setActiveFileId(remaining[0]?.id || '');
        }
    };
    const getFileIcon = (name)=>{
        const type = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$DynamicCanvas$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getFileType"])(name);
        if (type === 'code') return '⟨⟩';
        if (type === 'finance') return '⊞';
        if (type === 'whiteboard') return '⬡';
        return '☰';
    };
    const handleSelectFromGraph = (id)=>{
        setActiveFileId(id);
        setSection('files');
    };
    const B = {
        bg: 'var(--color-cortex-bg)',
        sidebar: 'var(--color-cortex-sidebar)',
        border: 'var(--color-cortex-border)',
        amber: 'var(--color-cortex-amber)',
        amberGlow: 'var(--color-cortex-amberGlow)',
        amberBorder: 'var(--color-cortex-amberBorder)',
        text: 'var(--color-cortex-text)',
        muted: 'var(--color-cortex-muted)',
        surface: 'var(--color-cortex-surface)',
        elevated: 'var(--color-cortex-elevated)'
    };
    const fileType = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$DynamicCanvas$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getFileType"])(activeFile.name);
    const supportsPages = fileType === 'text' || fileType === 'whiteboard';
    const pages = supportsPages ? getPages(activeFile.id, activeFile.content) : null;
    const currentPageIdx = getCurrentPageIdx(activeFile.id);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        style: {
            display: 'flex',
            height: '100vh',
            background: B.bg,
            color: B.text,
            fontFamily: "var(--font-dm-sans), system-ui, sans-serif",
            minWidth: 880,
            overflow: 'hidden'
        },
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                style: {
                    width: focusMode ? 0 : 260,
                    overflow: 'hidden',
                    background: B.sidebar,
                    borderRight: focusMode ? 'none' : `1px solid ${B.border}`,
                    display: 'flex',
                    flexDirection: 'column',
                    flexShrink: 0,
                    transition: 'width 0.25s ease'
                },
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        style: {
                            padding: '20px 18px 14px',
                            borderBottom: `1px solid ${B.border}`
                        },
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            style: {
                                display: 'flex',
                                alignItems: 'center',
                                gap: 8
                            },
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    style: {
                                        width: 26,
                                        height: 26,
                                        borderRadius: 8,
                                        background: B.amber,
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        fontSize: 13,
                                        color: B.bg
                                    },
                                    children: "✦"
                                }, void 0, false, {
                                    fileName: "[project]/src/app/page.tsx",
                                    lineNumber: 195,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    style: {
                                        fontSize: 16,
                                        fontWeight: 500,
                                        color: B.text,
                                        letterSpacing: -.3
                                    },
                                    children: "CORTEX"
                                }, void 0, false, {
                                    fileName: "[project]/src/app/page.tsx",
                                    lineNumber: 199,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/app/page.tsx",
                            lineNumber: 194,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/src/app/page.tsx",
                        lineNumber: 193,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        style: {
                            padding: '10px 10px 0',
                            borderBottom: `1px solid ${B.border}`,
                            paddingBottom: 10
                        },
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            style: {
                                display: 'flex',
                                gap: 3,
                                background: B.surface,
                                borderRadius: 8,
                                padding: 3,
                                border: `1px solid ${B.border}`
                            },
                            children: [
                                [
                                    'files',
                                    '☰ Files'
                                ],
                                [
                                    'consciousness',
                                    '◎ Consciousness'
                                ]
                            ].map(([key, label])=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    onClick: ()=>setSection(key),
                                    style: {
                                        flex: 1,
                                        padding: '5px 0',
                                        borderRadius: 6,
                                        fontSize: 11,
                                        fontWeight: 500,
                                        letterSpacing: .3,
                                        textTransform: 'uppercase',
                                        background: section === key ? B.elevated : 'transparent',
                                        color: section === key ? B.amber : B.muted,
                                        border: section === key ? `1px solid ${B.amberBorder}` : '1px solid transparent',
                                        transition: 'all .2s',
                                        cursor: 'pointer'
                                    },
                                    children: label
                                }, key, false, {
                                    fileName: "[project]/src/app/page.tsx",
                                    lineNumber: 210,
                                    columnNumber: 15
                                }, this))
                        }, void 0, false, {
                            fileName: "[project]/src/app/page.tsx",
                            lineNumber: 205,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/src/app/page.tsx",
                        lineNumber: 204,
                        columnNumber: 9
                    }, this),
                    section === 'files' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        style: {
                            flex: 1,
                            overflowY: 'auto',
                            padding: '12px 8px'
                        },
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                style: {
                                    fontSize: 10,
                                    color: B.muted,
                                    letterSpacing: 1,
                                    textTransform: 'uppercase',
                                    padding: '0 10px 8px',
                                    fontWeight: 500
                                },
                                children: "Workspace Files"
                            }, void 0, false, {
                                fileName: "[project]/src/app/page.tsx",
                                lineNumber: 227,
                                columnNumber: 13
                            }, this),
                            files.map((f)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    onClick: ()=>setActiveFileId(f.id),
                                    style: {
                                        padding: '9px 10px',
                                        borderRadius: 8,
                                        marginBottom: 2,
                                        cursor: 'pointer',
                                        background: activeFileId === f.id ? B.amberGlow : 'transparent',
                                        border: activeFileId === f.id ? `1px solid ${B.amberBorder}` : '1px solid transparent',
                                        transition: 'all .15s',
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: 8,
                                        position: 'relative'
                                    },
                                    onMouseEnter: (e)=>{
                                        const btn = e.currentTarget.querySelector('.del-btn');
                                        if (btn) btn.style.opacity = '1';
                                    },
                                    onMouseLeave: (e)=>{
                                        const btn = e.currentTarget.querySelector('.del-btn');
                                        if (btn) btn.style.opacity = '0';
                                    },
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            style: {
                                                fontSize: 12,
                                                color: activeFileId === f.id ? B.amber : B.muted
                                            },
                                            children: getFileIcon(f.name)
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/page.tsx",
                                            lineNumber: 254,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            style: {
                                                fontSize: 13,
                                                fontWeight: 500,
                                                flex: 1,
                                                color: activeFileId === f.id ? B.text : '#b8b5cc',
                                                whiteSpace: 'nowrap',
                                                overflow: 'hidden',
                                                textOverflow: 'ellipsis'
                                            },
                                            children: f.name
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/page.tsx",
                                            lineNumber: 257,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                            className: "del-btn",
                                            onClick: (e)=>{
                                                e.stopPropagation();
                                                handleDeleteFile(f.id);
                                            },
                                            style: {
                                                opacity: 0,
                                                transition: 'opacity .15s',
                                                fontSize: 14,
                                                lineHeight: 1,
                                                color: B.muted,
                                                flexShrink: 0,
                                                padding: '0 2px',
                                                background: 'none',
                                                border: 'none',
                                                cursor: 'pointer'
                                            },
                                            children: "×"
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/page.tsx",
                                            lineNumber: 264,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, f.id, true, {
                                    fileName: "[project]/src/app/page.tsx",
                                    lineNumber: 234,
                                    columnNumber: 15
                                }, this)),
                            relatedFiles.length > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                style: {
                                    marginTop: 12,
                                    borderTop: `1px solid ${B.border}`,
                                    paddingTop: 12
                                },
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        style: {
                                            fontSize: 10,
                                            color: B.muted,
                                            letterSpacing: 1,
                                            textTransform: 'uppercase',
                                            padding: '0 10px 8px',
                                            fontWeight: 500,
                                            display: 'flex',
                                            alignItems: 'center',
                                            gap: 6
                                        },
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                style: {
                                                    width: 6,
                                                    height: 6,
                                                    borderRadius: '50%',
                                                    background: '#4dba84',
                                                    display: 'inline-block'
                                                }
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/page.tsx",
                                                lineNumber: 286,
                                                columnNumber: 19
                                            }, this),
                                            "Related"
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/app/page.tsx",
                                        lineNumber: 282,
                                        columnNumber: 17
                                    }, this),
                                    relatedFiles.map((r)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            onClick: ()=>setActiveFileId(r.id),
                                            style: {
                                                padding: '8px 10px',
                                                borderRadius: 8,
                                                marginBottom: 2,
                                                cursor: 'pointer',
                                                border: '1px solid transparent',
                                                transition: 'all .15s'
                                            },
                                            onMouseEnter: (e)=>{
                                                e.currentTarget.style.background = B.surface;
                                                e.currentTarget.style.border = `1px solid ${B.border}`;
                                            },
                                            onMouseLeave: (e)=>{
                                                e.currentTarget.style.background = 'transparent';
                                                e.currentTarget.style.border = '1px solid transparent';
                                            },
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    style: {
                                                        display: 'flex',
                                                        alignItems: 'center',
                                                        gap: 6,
                                                        marginBottom: 3
                                                    },
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            style: {
                                                                fontSize: 11,
                                                                color: B.muted
                                                            },
                                                            children: getFileIcon(r.name)
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/app/page.tsx",
                                                            lineNumber: 298,
                                                            columnNumber: 23
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            style: {
                                                                fontSize: 12,
                                                                fontWeight: 500,
                                                                color: '#b8b5cc',
                                                                whiteSpace: 'nowrap',
                                                                overflow: 'hidden',
                                                                textOverflow: 'ellipsis'
                                                            },
                                                            children: r.name
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/app/page.tsx",
                                                            lineNumber: 299,
                                                            columnNumber: 23
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            style: {
                                                                marginLeft: 'auto',
                                                                fontSize: 10,
                                                                color: '#4dba84',
                                                                fontWeight: 600,
                                                                flexShrink: 0
                                                            },
                                                            children: [
                                                                Math.round(r.score * 100),
                                                                "%"
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/src/app/page.tsx",
                                                            lineNumber: 305,
                                                            columnNumber: 23
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/app/page.tsx",
                                                    lineNumber: 297,
                                                    columnNumber: 21
                                                }, this),
                                                r.reason && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    style: {
                                                        fontSize: 10,
                                                        color: B.muted,
                                                        paddingLeft: 18,
                                                        whiteSpace: 'nowrap',
                                                        overflow: 'hidden',
                                                        textOverflow: 'ellipsis'
                                                    },
                                                    children: r.reason
                                                }, void 0, false, {
                                                    fileName: "[project]/src/app/page.tsx",
                                                    lineNumber: 310,
                                                    columnNumber: 23
                                                }, this)
                                            ]
                                        }, r.id, true, {
                                            fileName: "[project]/src/app/page.tsx",
                                            lineNumber: 290,
                                            columnNumber: 19
                                        }, this))
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/app/page.tsx",
                                lineNumber: 281,
                                columnNumber: 15
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/app/page.tsx",
                        lineNumber: 226,
                        columnNumber: 11
                    }, this),
                    section === 'consciousness' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        style: {
                            flex: 1,
                            overflowY: 'auto',
                            padding: '16px 12px'
                        },
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                style: {
                                    fontSize: 10,
                                    color: B.muted,
                                    letterSpacing: 1,
                                    textTransform: 'uppercase',
                                    padding: '0 0 10px',
                                    fontWeight: 500
                                },
                                children: "Consciousness"
                            }, void 0, false, {
                                fileName: "[project]/src/app/page.tsx",
                                lineNumber: 326,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                style: {
                                    fontSize: 12,
                                    color: B.muted,
                                    lineHeight: 1.7
                                },
                                children: "Nodes are your files. Edges show semantic connections based on type and naming."
                            }, void 0, false, {
                                fileName: "[project]/src/app/page.tsx",
                                lineNumber: 332,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                style: {
                                    marginTop: 16,
                                    fontSize: 12,
                                    color: B.muted
                                },
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        style: {
                                            marginBottom: 8,
                                            fontWeight: 500,
                                            color: B.text
                                        },
                                        children: "Legend"
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/page.tsx",
                                        lineNumber: 336,
                                        columnNumber: 15
                                    }, this),
                                    [
                                        [
                                            '☰',
                                            '#6199f5',
                                            'Text / Notes'
                                        ],
                                        [
                                            '⟨⟩',
                                            '#9b7ff0',
                                            'Code'
                                        ],
                                        [
                                            '⊞',
                                            '#4dba84',
                                            'Finance'
                                        ],
                                        [
                                            '⬡',
                                            '#f09532',
                                            'Whiteboard'
                                        ]
                                    ].map(([icon, color, label])=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            style: {
                                                display: 'flex',
                                                alignItems: 'center',
                                                gap: 8,
                                                marginBottom: 6
                                            },
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    style: {
                                                        color: color,
                                                        fontSize: 13
                                                    },
                                                    children: icon
                                                }, void 0, false, {
                                                    fileName: "[project]/src/app/page.tsx",
                                                    lineNumber: 339,
                                                    columnNumber: 19
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    children: label
                                                }, void 0, false, {
                                                    fileName: "[project]/src/app/page.tsx",
                                                    lineNumber: 340,
                                                    columnNumber: 19
                                                }, this)
                                            ]
                                        }, label, true, {
                                            fileName: "[project]/src/app/page.tsx",
                                            lineNumber: 338,
                                            columnNumber: 17
                                        }, this))
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/app/page.tsx",
                                lineNumber: 335,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                style: {
                                    marginTop: 20,
                                    padding: '10px 12px',
                                    borderRadius: 8,
                                    background: B.surface,
                                    border: `1px solid ${B.border}`,
                                    fontSize: 11,
                                    color: B.muted,
                                    lineHeight: 1.6
                                },
                                children: "💡 Click any node in the graph to open that file."
                            }, void 0, false, {
                                fileName: "[project]/src/app/page.tsx",
                                lineNumber: 344,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/app/page.tsx",
                        lineNumber: 325,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        style: {
                            padding: '12px',
                            borderTop: `1px solid ${B.border}`
                        },
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            onClick: handleCreateFile,
                            style: {
                                width: '100%',
                                padding: '8px',
                                borderRadius: 8,
                                fontSize: 12,
                                color: B.muted,
                                border: `1px dashed ${B.border}`,
                                fontWeight: 500,
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                gap: 6,
                                cursor: 'pointer'
                            },
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    style: {
                                        fontSize: 16,
                                        lineHeight: 1
                                    },
                                    children: "+"
                                }, void 0, false, {
                                    fileName: "[project]/src/app/page.tsx",
                                    lineNumber: 362,
                                    columnNumber: 13
                                }, this),
                                " New File"
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/app/page.tsx",
                            lineNumber: 356,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/src/app/page.tsx",
                        lineNumber: 355,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/app/page.tsx",
                lineNumber: 185,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                style: {
                    flex: 1,
                    display: 'flex',
                    flexDirection: 'column',
                    overflow: 'hidden',
                    minWidth: 0
                },
                children: [
                    section === 'files' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        style: {
                            height: 56,
                            borderBottom: `1px solid ${B.border}`,
                            display: 'flex',
                            alignItems: 'center',
                            padding: '0 20px',
                            gap: 16,
                            flexShrink: 0,
                            background: B.sidebar
                        },
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                style: {
                                    flex: 1,
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: 10
                                },
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        style: {
                                            color: B.muted,
                                            fontSize: 13
                                        },
                                        children: getFileIcon(activeFile.name)
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/page.tsx",
                                        lineNumber: 375,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                        value: activeFile.name,
                                        onChange: (e)=>handleUpdateFileName(activeFile.id, e.target.value),
                                        className: "bg-transparent border-none outline-none font-medium text-sm min-w-[200px]",
                                        style: {
                                            color: B.text
                                        },
                                        placeholder: "Filename..."
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/page.tsx",
                                        lineNumber: 376,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        style: {
                                            fontSize: 11,
                                            color: B.muted,
                                            background: B.surface,
                                            padding: '2px 8px',
                                            borderRadius: 12,
                                            border: `1px solid ${B.border}`
                                        },
                                        children: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$DynamicCanvas$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getFileType"])(activeFile.name)
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/page.tsx",
                                        lineNumber: 383,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/app/page.tsx",
                                lineNumber: 374,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                id: "save-workspace-btn",
                                onClick: handleSave,
                                title: "Save all files to browser storage (Cmd+S)",
                                style: {
                                    padding: '4px 12px',
                                    borderRadius: 7,
                                    fontSize: 11,
                                    fontWeight: 500,
                                    cursor: 'pointer',
                                    transition: 'all .2s',
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: 5,
                                    background: saveFlash ? 'rgba(77,186,132,0.12)' : B.amberGlow,
                                    color: saveFlash ? '#4dba84' : B.amber,
                                    border: saveFlash ? '1px solid rgba(77,186,132,0.3)' : `1px solid ${B.amberBorder}`
                                },
                                children: saveFlash ? '✓ Saved' : '⬇ Save'
                            }, void 0, false, {
                                fileName: "[project]/src/app/page.tsx",
                                lineNumber: 392,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                onClick: ()=>setFocusMode((v)=>!v),
                                title: focusMode ? 'Exit Focus Mode' : 'Focus Mode — hide sidebar',
                                style: {
                                    padding: '4px 10px',
                                    borderRadius: 7,
                                    fontSize: 11,
                                    fontWeight: 500,
                                    cursor: 'pointer',
                                    transition: 'all .2s',
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: 5,
                                    background: focusMode ? B.amberGlow : 'transparent',
                                    color: focusMode ? B.amber : B.muted,
                                    border: focusMode ? `1px solid ${B.amberBorder}` : `1px solid transparent`
                                },
                                children: focusMode ? '◧ Exit Focus' : '▣ Focus'
                            }, void 0, false, {
                                fileName: "[project]/src/app/page.tsx",
                                lineNumber: 408,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/app/page.tsx",
                        lineNumber: 370,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        style: {
                            flex: 1,
                            display: 'flex',
                            overflow: 'hidden'
                        },
                        children: section === 'consciousness' ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ConsciousnessView$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                            files: files,
                            activeFileId: activeFileId,
                            onSelectFile: handleSelectFromGraph
                        }, void 0, false, {
                            fileName: "[project]/src/app/page.tsx",
                            lineNumber: 427,
                            columnNumber: 13
                        }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$DynamicCanvas$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                            file: {
                                ...activeFile,
                                content: pages ? pages[currentPageIdx]?.content ?? '' : activeFile.content
                            },
                            onChange: (id, content)=>{
                                if (pages) {
                                    const updated = pages.map((p, i)=>i === currentPageIdx ? {
                                            ...p,
                                            content
                                        } : p);
                                    setPagesMap((prev)=>({
                                            ...prev,
                                            [id]: updated
                                        }));
                                } else {
                                    handleUpdateFileContent(id, content);
                                }
                            },
                            pages: pages,
                            currentPageIdx: currentPageIdx,
                            onAddPage: ()=>handleAddPage(activeFile.id, activeFile.content),
                            onSelectPage: (idx)=>handleSelectPage(activeFile.id, idx),
                            currentBgType: pages?.[currentPageIdx]?.bgType ?? 'dotted',
                            onChangeBgType: (t)=>handleChangeBgType(activeFile.id, currentPageIdx, t)
                        }, `${activeFile.id}-${currentPageIdx}`, false, {
                            fileName: "[project]/src/app/page.tsx",
                            lineNumber: 433,
                            columnNumber: 13
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/src/app/page.tsx",
                        lineNumber: 425,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/app/page.tsx",
                lineNumber: 368,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/app/page.tsx",
        lineNumber: 179,
        columnNumber: 5
    }, this);
}
}),
];

//# sourceMappingURL=src_0gei~.f._.js.map