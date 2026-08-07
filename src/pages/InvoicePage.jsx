import { useMemo, useRef, useState, useEffect } from 'react'
import html2canvas from 'html2canvas-pro'
import jsPDF from 'jspdf'

const defaultLineItem = { accountCode: '', particulars: '', quantity: '', amount: '' }
const defaultSignature = {
  image: null,
  preparedBy: '',
  preparedRole: '',
  preparedDate: new Date().toISOString().split('T')[0],
  approvedBy: '',
  approvedRole: '',
  approvedDate: '',
}

// The firm's Zelle account. Fixed on the invoice, prefilled but editable on the voucher.
const NIXOL_ZELLE = 'duahkwaku79@gmail.com'

const defaultVoucher = {
  number: '',
  date: new Date().toISOString().split('T')[0],
  payTo: '',
  being: '',
  zelle: NIXOL_ZELLE,
}

// Shared by the invoice and the payment voucher — same Nixol masthead, different title
// and reference-number label.
function DocumentHeader({ title, number, date, payTo, numberLabel = 'No.' }) {
  return (
    <div style={{ background: 'linear-gradient(to right, #1e3a8a, #1e40af)', color: '#ffffff', padding: '20px 24px' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <img
            src='/logo.png'
            alt='Nixol Management Consult'
            style={{ height: '48px', width: '48px', objectFit: 'contain', backgroundColor: '#ffffff', borderRadius: '6px', padding: '6px' }}
          />
          <div>
            <h1 style={{ fontSize: '20px', fontWeight: 'bold', marginBottom: '4px', lineHeight: '1.2' }}>
              Nixol Management Consult
            </h1>
            <p style={{ color: '#bfdbfe', fontSize: '12px', lineHeight: '1.2' }}>
              Business Strategy, Finance, and Compliance
            </p>
          </div>
        </div>

        <div style={{ textAlign: 'right' }}>
          <div style={{ fontSize: '22px', fontWeight: 'bold', marginBottom: '4px', lineHeight: '1.2' }}>
            {title}
          </div>
        </div>
      </div>

      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          paddingTop: '10px',
          borderTop: '1px solid #1d4ed8',
          fontSize: '12px',
          flexWrap: 'wrap',
          gap: '1rem',
        }}
      >
        <div>
          <span style={{ color: '#bfdbfe' }}>Pay To:</span>{' '}
          <span style={{ fontWeight: '600', marginLeft: '6px' }}>{payTo || '_______________'}</span>
        </div>
        <div style={{ display: 'flex', gap: '24px', flexWrap: 'wrap' }}>
          <div>
            <span style={{ color: '#bfdbfe' }}>{numberLabel}:</span>{' '}
            <span style={{ fontWeight: '600', marginLeft: '6px' }}>{number || '_______________'}</span>
          </div>
          <div>
            <span style={{ color: '#bfdbfe' }}>Date:</span>{' '}
            <span style={{ fontWeight: '600', marginLeft: '6px' }}>{date || '_______________'}</span>
          </div>
        </div>
      </div>
    </div>
  )
}

function RequisitionHeader({ refNo, date }) {
  return (
    <div style={{ background: 'linear-gradient(to right, #1e3a8a, #1e40af)', color: '#ffffff', padding: '20px 24px' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <img
            src='/logo.png'
            alt='Nixol Management Consult'
            style={{ height: '48px', width: '48px', objectFit: 'contain', backgroundColor: '#ffffff', borderRadius: '6px', padding: '6px' }}
          />
          <div>
            <h1 style={{ fontSize: '20px', fontWeight: 'bold', marginBottom: '4px', lineHeight: '1.2' }}>
              Nixol Management Consult
            </h1>
            <p style={{ color: '#bfdbfe', fontSize: '12px', lineHeight: '1.2' }}>
              Business Strategy, Finance, and Compliance
            </p>
          </div>
        </div>

        <div style={{ textAlign: 'right' }}>
          <div style={{ fontSize: '22px', fontWeight: 'bold', marginBottom: '4px', lineHeight: '1.2' }}>
            REQUISITION VOUCHER
          </div>
          <div style={{ fontSize: '13px', color: '#e0e7ff' }}>
            Ref No: {refNo || '_______________'}
          </div>
        </div>
      </div>

      {date && (
        <div style={{ marginTop: '12px', fontSize: '12px', color: '#dbeafe' }}>
          Date: {date}
        </div>
      )}
    </div>
  )
}

const cell = (extra = {}) => ({ border: '1px solid #94a3b8', padding: '8px', fontSize: '11px', ...extra })

// Printed line-item table. The payment voucher omits the account-code column.
function LineItemsTable({ lineItems, grandTotal, calculateLineTotal, showAccountCode = true }) {
  return (
    <table style={{ width: '100%', borderCollapse: 'collapse', border: '1px solid #94a3b8' }}>
      <thead>
        <tr style={{ backgroundColor: '#f1f5f9' }}>
          {showAccountCode && <th style={cell({ textAlign: 'left', fontWeight: '600' })}>Account Code</th>}
          <th style={cell({ textAlign: 'left', fontWeight: '600' })}>Particulars</th>
          <th style={cell({ textAlign: 'center', fontWeight: '600', width: '75px' })}>Quantity</th>
          <th style={cell({ textAlign: 'right', fontWeight: '600', width: '95px' })}>Amount ($)</th>
          <th style={cell({ textAlign: 'right', fontWeight: '600', width: '95px' })}>Total ($)</th>
        </tr>
      </thead>
      <tbody>
        {lineItems.map((item, index) => {
          const lineTotal = calculateLineTotal(item.quantity, item.amount)
          return (
            <tr key={index}>
              {showAccountCode && <td style={cell()}>{item.accountCode || '—'}</td>}
              <td style={cell()}>{item.particulars || '—'}</td>
              <td style={cell({ textAlign: 'center' })}>{item.quantity || ''}</td>
              <td style={cell({ textAlign: 'right' })}>{item.amount ? parseFloat(item.amount).toFixed(2) : ''}</td>
              <td style={cell({ textAlign: 'right' })}>{lineTotal ? lineTotal.toFixed(2) : ''}</td>
            </tr>
          )
        })}
        <tr style={{ backgroundColor: '#f8fafc', fontWeight: '600' }}>
          <td colSpan={showAccountCode ? 4 : 3} style={cell({ textAlign: 'right' })}>GRAND TOTAL</td>
          <td style={cell({ textAlign: 'right' })}>$ {grandTotal.toFixed(2)}</td>
        </tr>
      </tbody>
    </table>
  )
}

function SignatureFooter({ signature }) {
  return (
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px', marginTop: '32px', borderTop: '1px solid #cbd5e1', paddingTop: '24px', fontSize: '11px' }}>
      <div>
        <div style={{ fontWeight: '600', marginBottom: '6px' }}>Prepared by:</div>
        <div style={{ marginBottom: '4px' }}>{signature.preparedBy || '_______________'}</div>
        {signature.image && (
          <img src={signature.image} alt='Prepared signature' style={{ height: '36px', objectFit: 'contain', marginBottom: '8px' }} />
        )}
        <div style={{ color: '#64748b', marginBottom: '4px' }}>{signature.preparedRole || 'Role'}</div>
        <div style={{ color: '#64748b' }}>Date: {signature.preparedDate || '_______________'}</div>
      </div>
      <div>
        <div style={{ fontWeight: '600', marginBottom: '6px' }}>Approved by:</div>
        <div style={{ marginBottom: '4px' }}>{signature.approvedBy || '_______________'}</div>
        <div style={{ color: '#64748b', marginBottom: '4px' }}>{signature.approvedRole || 'Role'}</div>
        <div style={{ color: '#64748b' }}>Date: {signature.approvedDate || '_______________'}</div>
      </div>
    </div>
  )
}

function PaymentVoucherPreview({ voucher, lineItems, grandTotal, calculateLineTotal, signature }) {
  return (
    <div>
      <DocumentHeader title='PAYMENT VOUCHER' number={voucher.number} date={voucher.date} payTo={voucher.payTo} numberLabel='Voucher No.' />
      <div style={{ padding: '24px' }}>
        <LineItemsTable lineItems={lineItems} grandTotal={grandTotal} calculateLineTotal={calculateLineTotal} showAccountCode={false} />

        <div style={{ marginTop: '20px', fontSize: '11px' }}>
          <div style={{ fontWeight: '600', marginBottom: '4px' }}>Being:</div>
          <div style={{ color: '#334155', minHeight: '32px' }}>{voucher.being || '—'}</div>
        </div>

        <div style={{ marginTop: '20px', border: '1px solid #94a3b8' }}>
          <div style={{ backgroundColor: '#f1f5f9', borderBottom: '1px solid #94a3b8', padding: '8px', fontSize: '11px', fontWeight: '600', textAlign: 'center' }}>
            Method of Payment
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', fontSize: '11px' }}>
            <div style={{ padding: '10px 12px', borderRight: '1px solid #e2e8f0' }}>
              <div style={{ fontWeight: '600', marginBottom: '4px' }}>Method:</div>
              <div style={{ color: '#334155' }}>Zelle</div>
            </div>
            <div style={{ padding: '10px 12px' }}>
              <div style={{ fontWeight: '600', marginBottom: '4px' }}>Zelle Email:</div>
              <div style={{ color: '#334155' }}>{voucher.zelle || '_______________'}</div>
            </div>
          </div>
        </div>

        <div style={{ marginTop: '12px', fontSize: '10px', color: '#64748b', fontStyle: 'italic' }}>
          Payment for this voucher is to be made through Zelle to the account shown above.
        </div>

        <SignatureFooter signature={signature} />
      </div>
    </div>
  )
}

function InvoiceLineItems({ lineItems, setLineItems, calculateLineTotal, showAccountCode = true }) {
  const addLineItem = () => {
    setLineItems([...lineItems, { ...defaultLineItem }])
  }

  const removeLineItem = (index) => {
    if (lineItems.length > 1) {
      setLineItems(lineItems.filter((_, i) => i !== index))
    }
  }

  const updateLineItem = (index, field, value) => {
    const updated = [...lineItems]
    updated[index][field] = value
    setLineItems(updated)
  }

  const grandTotal = lineItems.reduce((sum, item) => {
    return sum + calculateLineTotal(item.quantity, item.amount)
  }, 0)

  return (
    <div className='space-y-4'>
      {lineItems.map((item, index) => {
        const lineTotal = calculateLineTotal(item.quantity, item.amount)
        return (
          <div key={index} className='p-4 border border-slate-200 rounded-lg bg-slate-50 space-y-3'>
            <div className='flex items-center justify-between mb-2'>
              <span className='text-sm font-semibold text-slate-700'>Item {index + 1}</span>
              {lineItems.length > 1 && (
                <button
                  type='button'
                  onClick={() => removeLineItem(index)}
                  className='text-red-600 hover:text-red-800 text-sm font-medium flex items-center gap-1'
                >
                  Remove
                </button>
              )}
            </div>

            <div className='grid grid-cols-2 gap-3'>
              {showAccountCode && (
                <div>
                  <label className='block text-xs font-medium text-slate-700 mb-1'>Account Code</label>
                  <input
                    type='text'
                    value={item.accountCode}
                    onChange={(e) => updateLineItem(index, 'accountCode', e.target.value)}
                    className='w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white'
                    placeholder='e.g., ACC-001'
                  />
                </div>
              )}
              <div className={showAccountCode ? '' : 'col-span-2'}>
                <label className='block text-xs font-medium text-slate-700 mb-1'>Particulars</label>
                <input
                  type='text'
                  value={item.particulars}
                  onChange={(e) => updateLineItem(index, 'particulars', e.target.value)}
                  className='w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white'
                  placeholder='Description'
                />
              </div>
              <div>
                <label className='block text-xs font-medium text-slate-700 mb-1'>Quantity</label>
                <input
                  type='number'
                  step='1'
                  min='0'
                  value={item.quantity}
                  onChange={(e) => updateLineItem(index, 'quantity', e.target.value)}
                  className='w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white'
                  placeholder='0'
                />
              </div>
              <div>
                <label className='block text-xs font-medium text-slate-700 mb-1'>Amount ($)</label>
                <input
                  type='number'
                  step='0.01'
                  min='0'
                  value={item.amount}
                  onChange={(e) => updateLineItem(index, 'amount', e.target.value)}
                  className='w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white'
                  placeholder='0.00'
                />
              </div>
            </div>

            {lineTotal > 0 && (
              <div className='bg-blue-50 border border-blue-200 rounded px-3 py-2 text-sm'>
                <span className='text-slate-600'>Line Total:</span>{' '}
                <span className='font-semibold text-slate-800'>$ {lineTotal.toFixed(2)}</span>
              </div>
            )}
          </div>
        )
      })}

      <button
        type='button'
        onClick={addLineItem}
        className='w-full py-3 border-2 border-dashed border-slate-300 rounded-lg text-slate-600 hover:border-blue-500 hover:text-blue-600 hover:bg-blue-50 transition flex items-center justify-center gap-2 font-medium'
      >
        Add Line Item
      </button>

      <div className='bg-green-50 border-2 border-green-300 rounded-lg p-4'>
        <div className='flex justify-between items-center'>
          <span className='text-lg font-semibold text-slate-800'>Grand Total:</span>
          <div className='text-2xl font-bold text-green-700'>$ {grandTotal.toFixed(2)}</div>
        </div>
      </div>
    </div>
  )
}

function SignatureSection({ signature, setSignature }) {
  const [mode, setMode] = useState('draw')
  const [isDrawing, setIsDrawing] = useState(false)
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ratio = window.devicePixelRatio || 1
    const width = canvas.clientWidth
    const height = canvas.clientHeight

    canvas.width = width * ratio
    canvas.height = height * ratio

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    ctx.setTransform(ratio, 0, 0, ratio, 0, 0)
    ctx.lineWidth = 2
    ctx.lineCap = 'round'
    ctx.strokeStyle = '#0f172a'
    ctx.clearRect(0, 0, width, height)

    if (signature.image) {
      const image = new Image()
      image.onload = () => ctx.drawImage(image, 0, 0, width, height)
      image.src = signature.image
    }
  }, [signature.image])

  const updateSignature = (field, value) => {
    setSignature({ ...signature, [field]: value })
  }

  const handleSignatureUpload = (e) => {
    const file = e.target.files[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setSignature({ ...signature, image: reader.result })
      }
      reader.readAsDataURL(file)
    }
  }

  const getCanvasPosition = (event) => {
    const canvas = canvasRef.current
    if (!canvas) return { x: 0, y: 0 }
    const rect = canvas.getBoundingClientRect()
    return {
      x: event.clientX - rect.left,
      y: event.clientY - rect.top,
    }
  }

  const startDrawing = (event) => {
    const canvas = canvasRef.current
    const ctx = canvas?.getContext('2d')
    if (!canvas || !ctx) return

    const { x, y } = getCanvasPosition(event)
    ctx.beginPath()
    ctx.moveTo(x, y)
    setIsDrawing(true)
    canvas.setPointerCapture(event.pointerId)
  }

  const draw = (event) => {
    if (!isDrawing) return
    const canvas = canvasRef.current
    const ctx = canvas?.getContext('2d')
    if (!canvas || !ctx) return

    const { x, y } = getCanvasPosition(event)
    ctx.lineTo(x, y)
    ctx.stroke()
  }

  const stopDrawing = (event) => {
    if (!isDrawing) return
    const canvas = canvasRef.current
    if (!canvas) return

    setIsDrawing(false)
    if (canvas.releasePointerCapture) {
      canvas.releasePointerCapture(event.pointerId)
    }

    const dataUrl = canvas.toDataURL('image/png')
    setSignature({ ...signature, image: dataUrl })
  }

  const clearSignature = () => {
    const canvas = canvasRef.current
    if (canvas) {
      const ctx = canvas.getContext('2d')
      const width = canvas.clientWidth
      const height = canvas.clientHeight
      ctx?.clearRect(0, 0, width, height)
    }
    setSignature({ ...signature, image: null })
  }

  return (
    <div className='space-y-6'>
      <div className='bg-slate-50 border border-slate-200 rounded-lg p-4'>
        <div className='flex flex-wrap gap-2 mb-4'>
          <button
            type='button'
            onClick={() => setMode('draw')}
            className={`px-3 py-2 rounded-lg text-sm font-medium transition ${mode === 'draw' ? 'bg-slate-900 text-white' : 'bg-white text-slate-700 border border-slate-300 hover:bg-slate-100'}`}
          >
            Draw Signature
          </button>
          <button
            type='button'
            onClick={() => setMode('upload')}
            className={`px-3 py-2 rounded-lg text-sm font-medium transition ${mode === 'upload' ? 'bg-slate-900 text-white' : 'bg-white text-slate-700 border border-slate-300 hover:bg-slate-100'}`}
          >
            Upload Signature
          </button>
        </div>

        {mode === 'draw' ? (
          <div className='space-y-3'>
            <div className='relative'>
              <canvas
                ref={canvasRef}
                className='w-full h-40 rounded-lg border border-slate-300 bg-white touch-none'
                onPointerDown={startDrawing}
                onPointerMove={draw}
                onPointerUp={stopDrawing}
                onPointerLeave={stopDrawing}
              />
              <div className='absolute top-3 right-3 flex gap-2'>
                <button
                  type='button'
                  onClick={clearSignature}
                  className='px-3 py-2 rounded-lg bg-white border border-slate-300 text-slate-700 text-xs font-semibold hover:bg-slate-100'
                >
                  Clear
                </button>
              </div>
            </div>
            <p className='text-xs text-slate-500'>Use a stylus, finger, or mouse to sign directly on the canvas. It will save automatically when you lift.</p>
          </div>
        ) : (
          <div>
            <label className='block text-sm font-medium text-slate-700 mb-2'>Upload Signature</label>
            <div className='relative'>
              <input
                type='file'
                accept='image/*'
                onChange={handleSignatureUpload}
                className='hidden'
                id='signature-upload'
              />
              <label
                htmlFor='signature-upload'
                className='flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-slate-300 rounded-lg cursor-pointer hover:border-blue-500 hover:bg-blue-50 transition'
              >
                {signature.image ? (
                  <div className='relative w-full h-full flex items-center justify-center'>
                    <img src={signature.image} alt='Signature preview' className='max-h-28 object-contain' />
                    <div className='absolute top-2 right-2 bg-blue-600 text-white text-xs px-2 py-1 rounded'>✓ Uploaded</div>
                  </div>
                ) : (
                  <div className='text-center'>
                    <svg className='mx-auto h-12 w-12 text-slate-400' stroke='currentColor' fill='none' viewBox='0 0 48 48'>
                      <path
                        d='M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02'
                        strokeWidth={2}
                        strokeLinecap='round'
                        strokeLinejoin='round'
                      />
                    </svg>
                    <p className='mt-1 text-sm text-slate-600'>Click to upload signature</p>
                    <p className='text-xs text-slate-500'>PNG, JPG up to 2MB</p>
                  </div>
                )}
              </label>
            </div>
          </div>
        )}

        {signature.image && (
          <div className='mt-3 text-right'>
            <button
              type='button'
              onClick={clearSignature}
              className='px-3 py-2 rounded-lg bg-white border border-slate-300 text-slate-700 text-xs font-semibold hover:bg-slate-100'
            >
              Remove Signature
            </button>
          </div>
        )}
      </div>

      <div className='bg-slate-50 border border-slate-200 rounded-lg p-4'>
        <h3 className='font-semibold text-slate-800 mb-3 flex items-center gap-2'>
          <span className='w-6 h-6 bg-blue-600 text-white rounded flex items-center justify-center text-xs'>P</span>
          Prepared By
        </h3>
        <div className='grid grid-cols-2 gap-3'>
          <div>
            <label className='block text-xs font-medium text-slate-700 mb-1'>Name</label>
            <input
              type='text'
              value={signature.preparedBy}
              onChange={(e) => updateSignature('preparedBy', e.target.value)}
              className='w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white'
              placeholder='Your name'
            />
          </div>
          <div>
            <label className='block text-xs font-medium text-slate-700 mb-1'>Role/Title</label>
            <input
              type='text'
              value={signature.preparedRole}
              onChange={(e) => updateSignature('preparedRole', e.target.value)}
              className='w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white'
              placeholder='e.g., Finance Officer'
            />
          </div>
          <div className='col-span-2'>
            <label className='block text-xs font-medium text-slate-700 mb-1'>Date</label>
            <input
              type='date'
              value={signature.preparedDate}
              onChange={(e) => updateSignature('preparedDate', e.target.value)}
              className='w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white'
            />
          </div>
        </div>
      </div>

      <div className='bg-slate-50 border border-slate-200 rounded-lg p-4'>
        <h3 className='font-semibold text-slate-800 mb-3 flex items-center gap-2'>
          <span className='w-6 h-6 bg-green-600 text-white rounded flex items-center justify-center text-xs'>A</span>
          Approved By
        </h3>
        <div className='grid grid-cols-2 gap-3'>
          <div>
            <label className='block text-xs font-medium text-slate-700 mb-1'>Name</label>
            <input
              type='text'
              value={signature.approvedBy}
              onChange={(e) => updateSignature('approvedBy', e.target.value)}
              className='w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white'
              placeholder='Approver name'
            />
          </div>
          <div>
            <label className='block text-xs font-medium text-slate-700 mb-1'>Role/Title</label>
            <input
              type='text'
              value={signature.approvedRole}
              onChange={(e) => updateSignature('approvedRole', e.target.value)}
              className='w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white'
              placeholder='e.g., Director'
            />
          </div>
          <div className='col-span-2'>
            <label className='block text-xs font-medium text-slate-700 mb-1'>Date</label>
            <input
              type='date'
              value={signature.approvedDate}
              onChange={(e) => updateSignature('approvedDate', e.target.value)}
              className='w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white'
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default function InvoicePage() {
  const [mode, setMode] = useState('invoice')
  const [invoiceData, setInvoiceData] = useState({
    number: '',
    date: new Date().toISOString().split('T')[0],
    payTo: '',
    bankAccount: '',
    chequeNo: '',
  })

  const [requisitionData, setRequisitionData] = useState({
    refNo: '',
    amount: '',
    date: new Date().toISOString().split('T')[0],
    cash: '',
    chequeNo: '',
    to: '',
  })

  const [voucherData, setVoucherData] = useState({ ...defaultVoucher })

  const [lineItems, setLineItems] = useState([{ ...defaultLineItem }])
  const [signature, setSignature] = useState({ ...defaultSignature })
  const [isGenerating, setIsGenerating] = useState(false)

  const calculateLineTotal = (quantity, amount) => {
    const qty = parseFloat(quantity) || 0
    const amt = parseFloat(amount) || 0
    return qty * amt
  }

  const grandTotal = useMemo(
    () => lineItems.reduce((sum, item) => sum + calculateLineTotal(item.quantity, item.amount), 0),
    [lineItems]
  )

  const generatePDF = async () => {
    setIsGenerating(true)
    const element = document.getElementById('document-preview')

    try {
      const canvas = await html2canvas(element, {
        scale: 2,
        useCORS: true,
        logging: false,
        backgroundColor: '#ffffff',
      })

      const pageWidth = 210
      const pageHeight = 297
      const imgWidth = pageWidth
      const imgHeight = (canvas.height * pageWidth) / canvas.width

      const pdf = new jsPDF({ orientation: 'portrait', unit: 'mm', format: 'a4' })
      const imgData = canvas.toDataURL('image/png')

      if (imgHeight <= pageHeight) {
        pdf.addImage(imgData, 'PNG', 0, 0, imgWidth, imgHeight)
      } else {
        let heightLeft = imgHeight
        let position = 0
        let page = 0

        pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight)
        heightLeft -= pageHeight

        while (heightLeft > 0) {
          position = -(pageHeight * (page + 1))
          pdf.addPage()
          pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight)
          heightLeft -= pageHeight
          page++
        }
      }

      const fileName = {
        invoice:     `Nixol-Invoice-${invoiceData.number || 'draft'}.pdf`,
        requisition: `Nixol-Requisition-${requisitionData.refNo || 'draft'}.pdf`,
        voucher:     `Nixol-Payment-Voucher-${voucherData.number || 'draft'}.pdf`,
      }[mode]
      pdf.save(fileName)
    } catch (error) {
      console.error('Error generating PDF:', error)
      alert('Failed to generate PDF. Please try again.')
    } finally {
      setIsGenerating(false)
    }
  }

  const printDocument = () => {
    window.print()
  }

  return (
    <main className='min-h-screen bg-slate-50 py-12 px-4'>
      <style>{`
        @media print {
          body * { visibility: hidden !important; }
          #document-preview, #document-preview * { visibility: visible !important; }
          #document-preview { position: absolute; left: 0; top: 0; width: 100%; }
        }
      `}</style>

      <div className='max-w-7xl mx-auto'>
        <div className='mb-8 text-center'>
          <h1 className='text-4xl font-bold text-slate-900 mb-3'>Document Generator</h1>
          <p className='text-slate-600 max-w-2xl mx-auto'>Create Nixol Management Consult invoices, requisition vouchers, and payment vouchers, then print or download the finished document directly.</p>
        </div>

        <div className='flex flex-col sm:flex-row items-center justify-center gap-3 mb-10'>
          {[
            { key: 'invoice',     label: 'Payment Invoice' },
            { key: 'requisition', label: 'Requisition Voucher' },
            { key: 'voucher',     label: 'Payment Voucher' },
          ].map(({ key, label }) => (
            <button
              key={key}
              type='button'
              onClick={() => setMode(key)}
              className={`px-5 py-3 rounded-full font-semibold transition ${mode === key ? 'bg-slate-900 text-white' : 'bg-white text-slate-800 border border-slate-300 hover:bg-slate-100'}`}
            >
              {label}
            </button>
          ))}
        </div>

        <div className='grid grid-cols-1 lg:grid-cols-2 gap-8'>
          <div className='space-y-6'>
            <div className='bg-white rounded-3xl shadow-lg p-6 border border-slate-200'>
              <div className='flex items-start justify-between gap-4 mb-6'>
                <div>
                  <p className='text-sm uppercase tracking-[0.24em] text-slate-500 font-semibold'>Document type</p>
                  <h2 className='mt-3 text-2xl font-bold text-slate-900'>
                    {{ invoice: 'Invoice Details', requisition: 'Requisition Details', voucher: 'Payment Voucher Details' }[mode]}
                  </h2>
                </div>
              </div>

              {mode === 'invoice' ? (
                <div className='space-y-4'>
                  <div className='grid grid-cols-1 sm:grid-cols-2 gap-4'>
                    <div>
                      <label className='block text-sm font-medium text-slate-700 mb-1'>Invoice No.</label>
                      <input
                        type='text'
                        value={invoiceData.number}
                        onChange={(e) => setInvoiceData({ ...invoiceData, number: e.target.value })}
                        className='w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-slate-500 focus:border-transparent'
                        placeholder='INV-001'
                      />
                    </div>
                    <div>
                      <label className='block text-sm font-medium text-slate-700 mb-1'>Date</label>
                      <input
                        type='date'
                        value={invoiceData.date}
                        onChange={(e) => setInvoiceData({ ...invoiceData, date: e.target.value })}
                        className='w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-slate-500 focus:border-transparent'
                      />
                    </div>
                  </div>

                  <div>
                    <label className='block text-sm font-medium text-slate-700 mb-1'>Pay To</label>
                    <input
                      type='text'
                      value={invoiceData.payTo}
                      onChange={(e) => setInvoiceData({ ...invoiceData, payTo: e.target.value })}
                      className='w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-slate-500 focus:border-transparent'
                      placeholder='Recipient name'
                    />
                  </div>

                  <div className='grid grid-cols-1 sm:grid-cols-2 gap-4'>
                    <div>
                      <label className='block text-sm font-medium text-slate-700 mb-1'>Bank Account</label>
                      <input
                        type='text'
                        value={invoiceData.bankAccount}
                        onChange={(e) => setInvoiceData({ ...invoiceData, bankAccount: e.target.value })}
                        className='w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-slate-500 focus:border-transparent'
                        placeholder='Account number'
                      />
                    </div>
                    <div>
                      <label className='block text-sm font-medium text-slate-700 mb-1'>Cheque No.</label>
                      <input
                        type='text'
                        value={invoiceData.chequeNo}
                        onChange={(e) => setInvoiceData({ ...invoiceData, chequeNo: e.target.value })}
                        className='w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-slate-500 focus:border-transparent'
                        placeholder='Optional'
                      />
                    </div>
                  </div>

                  <div className='bg-slate-50 border border-slate-200 rounded-lg px-4 py-3 flex flex-wrap items-center justify-between gap-2'>
                    <span className='text-sm font-medium text-slate-700'>Zelle</span>
                    <span className='text-sm text-slate-800 font-semibold'>{NIXOL_ZELLE}</span>
                  </div>
                </div>
              ) : mode === 'voucher' ? (
                <div className='space-y-4'>
                  <div className='grid grid-cols-1 sm:grid-cols-2 gap-4'>
                    <div>
                      <label className='block text-sm font-medium text-slate-700 mb-1'>Voucher No.</label>
                      <input
                        type='text'
                        value={voucherData.number}
                        onChange={(e) => setVoucherData({ ...voucherData, number: e.target.value })}
                        className='w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-slate-500 focus:border-transparent'
                        placeholder='PV-001'
                      />
                    </div>
                    <div>
                      <label className='block text-sm font-medium text-slate-700 mb-1'>Date</label>
                      <input
                        type='date'
                        value={voucherData.date}
                        onChange={(e) => setVoucherData({ ...voucherData, date: e.target.value })}
                        className='w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-slate-500 focus:border-transparent'
                      />
                    </div>
                  </div>

                  <div>
                    <label className='block text-sm font-medium text-slate-700 mb-1'>Pay To</label>
                    <input
                      type='text'
                      value={voucherData.payTo}
                      onChange={(e) => setVoucherData({ ...voucherData, payTo: e.target.value })}
                      className='w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-slate-500 focus:border-transparent'
                      placeholder='Payee name'
                    />
                  </div>

                  <div>
                    <label className='block text-sm font-medium text-slate-700 mb-1'>Being (purpose of payment)</label>
                    <textarea
                      value={voucherData.being}
                      onChange={(e) => setVoucherData({ ...voucherData, being: e.target.value })}
                      rows={3}
                      className='w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-slate-500 focus:border-transparent'
                      placeholder='What this payment is for'
                    />
                  </div>

                  <div className='bg-slate-50 border border-slate-200 rounded-lg p-4'>
                    <h3 className='font-semibold text-slate-800 mb-1 text-sm'>Method of Payment — Zelle</h3>
                    <p className='text-xs text-slate-500 mb-3'>Payment vouchers are settled through Zelle.</p>
                    <label className='block text-xs font-medium text-slate-700 mb-1'>Zelle Email</label>
                    <input
                      type='email'
                      value={voucherData.zelle}
                      onChange={(e) => setVoucherData({ ...voucherData, zelle: e.target.value })}
                      className='w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:ring-2 focus:ring-slate-500 focus:border-transparent bg-white'
                      placeholder={NIXOL_ZELLE}
                    />
                  </div>
                </div>
              ) : (
                <div className='space-y-4'>
                  <div className='grid grid-cols-1 sm:grid-cols-2 gap-4'>
                    <div>
                      <label className='block text-sm font-medium text-slate-700 mb-1'>Ref No.</label>
                      <input
                        type='text'
                        value={requisitionData.refNo}
                        onChange={(e) => setRequisitionData({ ...requisitionData, refNo: e.target.value })}
                        className='w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-slate-500 focus:border-transparent'
                        placeholder='REQ-001'
                      />
                    </div>
                    <div>
                      <label className='block text-sm font-medium text-slate-700 mb-1'>Date</label>
                      <input
                        type='date'
                        value={requisitionData.date}
                        onChange={(e) => setRequisitionData({ ...requisitionData, date: e.target.value })}
                        className='w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-slate-500 focus:border-transparent'
                      />
                    </div>
                  </div>

                  <div className='grid grid-cols-1 sm:grid-cols-2 gap-4'>
                    <div>
                      <label className='block text-sm font-medium text-slate-700 mb-1'>Amount ($)</label>
                      <input
                        type='number'
                        step='0.01'
                        value={requisitionData.amount}
                        onChange={(e) => setRequisitionData({ ...requisitionData, amount: e.target.value })}
                        className='w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-slate-500 focus:border-transparent'
                        placeholder='0.00'
                      />
                    </div>
                    <div>
                      <label className='block text-sm font-medium text-slate-700 mb-1'>To</label>
                      <input
                        type='text'
                        value={requisitionData.to}
                        onChange={(e) => setRequisitionData({ ...requisitionData, to: e.target.value })}
                        className='w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-slate-500 focus:border-transparent'
                        placeholder='Recipient'
                      />
                    </div>
                  </div>

                  <div className='bg-slate-50 border border-slate-200 rounded-lg p-4'>
                    <h3 className='font-semibold text-slate-800 mb-3 text-sm'>Method of Payment</h3>
                    <div className='grid grid-cols-1 sm:grid-cols-2 gap-4'>
                      <div>
                        <label className='block text-xs font-medium text-slate-700 mb-1'>Cash</label>
                        <input
                          type='text'
                          value={requisitionData.cash}
                          onChange={(e) => setRequisitionData({ ...requisitionData, cash: e.target.value })}
                          className='w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:ring-2 focus:ring-slate-500 focus:border-transparent bg-white'
                          placeholder='Cash amount'
                        />
                      </div>
                      <div>
                        <label className='block text-xs font-medium text-slate-700 mb-1'>Cheque No.</label>
                        <input
                          type='text'
                          value={requisitionData.chequeNo}
                          onChange={(e) => setRequisitionData({ ...requisitionData, chequeNo: e.target.value })}
                          className='w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:ring-2 focus:ring-slate-500 focus:border-transparent bg-white'
                          placeholder='Optional'
                        />
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            <div className='bg-white rounded-3xl shadow-lg p-6 border border-slate-200'>
              <h3 className='text-xl font-semibold text-slate-900 mb-4'>Line Items</h3>
              <InvoiceLineItems
                lineItems={lineItems}
                setLineItems={setLineItems}
                calculateLineTotal={calculateLineTotal}
                showAccountCode={mode !== 'voucher'}
              />
            </div>

            <div className='bg-white rounded-3xl shadow-lg p-6 border border-slate-200'>
              <h3 className='text-xl font-semibold text-slate-900 mb-4'>Signatures</h3>
              <SignatureSection signature={signature} setSignature={setSignature} />
            </div>
          </div>

          <div className='space-y-6'>
            <div className='flex items-center gap-3 justify-between'>
              <div>
                <h2 className='text-xl font-semibold text-slate-900'>Preview</h2>
                <p className='text-sm text-slate-500'>Download or print the generated document.</p>
              </div>
              <div className='flex flex-wrap gap-2'>
                <button
                  type='button'
                  onClick={generatePDF}
                  disabled={isGenerating}
                  className='px-4 py-3 rounded-xl bg-slate-900 text-white hover:bg-slate-800 transition disabled:opacity-60'
                >
                  {isGenerating ? 'Generating...' : 'Download PDF'}
                </button>
                <button
                  type='button'
                  onClick={printDocument}
                  className='px-4 py-3 rounded-xl border border-slate-300 bg-white text-slate-900 hover:bg-slate-50 transition'
                >
                  Print
                </button>
              </div>
            </div>

            <div id='document-preview' style={{ backgroundColor: '#ffffff', borderRadius: '24px', overflow: 'hidden', border: '1px solid #e2e8f0' }}>
              {mode === 'invoice' ? (
                <div>
                  <DocumentHeader title='PAYMENT INVOICE' number={invoiceData.number} date={invoiceData.date} payTo={invoiceData.payTo} />
                  <div style={{ padding: '24px' }}>
                    <LineItemsTable lineItems={lineItems} grandTotal={grandTotal} calculateLineTotal={calculateLineTotal} />

                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '16px', marginTop: '24px', fontSize: '11px' }}>
                      <div>
                        <div style={{ fontWeight: '600', marginBottom: '4px' }}>Bank Account:</div>
                        <div style={{ color: '#334155' }}>{invoiceData.bankAccount || '_______________'}</div>
                      </div>
                      <div>
                        <div style={{ fontWeight: '600', marginBottom: '4px' }}>Zelle:</div>
                        <div style={{ color: '#334155' }}>{NIXOL_ZELLE}</div>
                      </div>
                      <div>
                        <div style={{ fontWeight: '600', marginBottom: '4px' }}>Cheque No.:</div>
                        <div style={{ color: '#334155' }}>{invoiceData.chequeNo || '_______________'}</div>
                      </div>
                    </div>

                    <SignatureFooter signature={signature} />
                  </div>
                </div>
              ) : mode === 'voucher' ? (
                <PaymentVoucherPreview
                  voucher={voucherData}
                  lineItems={lineItems}
                  grandTotal={grandTotal}
                  calculateLineTotal={calculateLineTotal}
                  signature={signature}
                />
              ) : (
                <div>
                  <RequisitionHeader refNo={requisitionData.refNo} date={requisitionData.date} />
                  <div style={{ padding: '24px' }}>
                    <table style={{ width: '100%', borderCollapse: 'collapse', border: '1px solid #1e293b' }}>
                      <tbody>
                        <tr>
                          <td style={{ border: '1px solid #1e293b', padding: '10px 12px', fontSize: '12px', fontWeight: '600', width: '18%' }}>Amount:</td>
                          <td style={{ border: '1px solid #1e293b', padding: '10px 12px', fontSize: '12px' }}>{requisitionData.amount ? `$ ${parseFloat(requisitionData.amount).toFixed(2)}` : ''}</td>
                          <td style={{ border: '1px solid #1e293b', padding: '10px 12px', fontSize: '12px', fontWeight: '600', width: '16%' }}>Date:</td>
                          <td style={{ border: '1px solid #1e293b', padding: '10px 12px', fontSize: '12px' }}>{requisitionData.date}</td>
                        </tr>
                        <tr style={{ backgroundColor: '#f1f5f9' }}>
                          <td colSpan={4} style={{ border: '1px solid #1e293b', padding: '10px 12px', fontSize: '12px', fontWeight: '600', textAlign: 'center' }}>Method of Payment</td>
                        </tr>
                        <tr>
                          <td style={{ border: '1px solid #1e293b', padding: '10px 12px', fontSize: '12px', fontWeight: '600' }}>Cash:</td>
                          <td style={{ border: '1px solid #1e293b', padding: '10px 12px', fontSize: '12px' }}>{requisitionData.cash || '—'}</td>
                          <td style={{ border: '1px solid #1e293b', padding: '10px 12px', fontSize: '12px', fontWeight: '600' }}>Cheque:</td>
                          <td style={{ border: '1px solid #1e293b', padding: '10px 12px', fontSize: '12px' }}>{requisitionData.chequeNo || '—'}</td>
                        </tr>
                        <tr>
                          <td style={{ border: '1px solid #1e293b', padding: '10px 12px', fontSize: '12px', fontWeight: '600', verticalAlign: 'top' }}>To:</td>
                          <td colSpan={3} style={{ border: '1px solid #1e293b', padding: '10px 12px', fontSize: '12px' }}>{requisitionData.to || '—'}</td>
                        </tr>
                        <tr>
                          <td style={{ border: '1px solid #1e293b', padding: '10px 12px', fontSize: '12px', fontWeight: '600', verticalAlign: 'top' }}>Being:</td>
                          <td colSpan={3} style={{ border: '1px solid #1e293b', padding: '10px 12px', fontSize: '12px', minHeight: '60px' }}></td>
                        </tr>
                        <tr>
                          <td colSpan={2} style={{ border: '1px solid #1e293b', padding: '12px', fontSize: '11px', verticalAlign: 'top' }}>
                            <div style={{ fontWeight: '600', marginBottom: '4px' }}>Approved By:</div>
                            <div style={{ marginTop: '8px' }}>{signature.approvedBy || '_______________'}</div>
                            {signature.image && <img src={signature.image} alt='Signature' style={{ height: '30px', objectFit: 'contain', marginTop: '4px' }} />}
                          </td>
                          <td colSpan={2} style={{ border: '1px solid #1e293b', padding: '12px', fontSize: '11px', verticalAlign: 'top' }}>
                            <div style={{ fontWeight: '600', marginBottom: '4px' }}>Prepared By:</div>
                            <div style={{ marginTop: '8px' }}>{signature.preparedBy || '_______________'}</div>
                            <div style={{ marginTop: '4px', color: '#64748b' }}>Date: {signature.preparedDate || '_______________'}</div>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
