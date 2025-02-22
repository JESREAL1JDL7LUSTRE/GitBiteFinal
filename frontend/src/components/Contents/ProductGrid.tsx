import React from 'react'

const ProductGrid = () => {
  return (
    <div data-hs-layout-splitter='{
      "horizontalSplitterTemplate": "<div><span className=\"absolute top-1/2 start-1/2 -translate-x-1/2 -translate-y-1/2 block w-4 h-6 flex justify-center items-center bg-white border border-gray-200 text-gray-400 rounded-md cursor-col-resize hover:bg-gray-100"><svg className=\"shrink-0 size-3.5\" xmlns=\"http://www.w3.org/2000/svg\" width=\"24\" height=\"24\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" strokeWidth=\"2\" strokeLinecap=\"round\" strokeLinejoin=\"round\"><circle cx=\"9\" cy=\"12\" r=\"1\"/><circle cx=\"9\" cy=\"5\" r=\"1\"/><circle cx=\"9\" cy=\"19\" r=\"1\"/><circle cx=\"15\" cy=\"12\" r=\"1\"/><circle cx=\"15\" cy=\"5\" r=\"1\"/><circle cx=\"15\" cy=\"19\" r=\"1\"/></svg></span></div>",
      "horizontalSplitterClasses": "relative flex border-s border-gray-200"
    }'>
      <div className="flex bg-white border border-gray-200 rounded-lg h-[200px]" data-hs-layout-splitter-horizontal-group="">
        <div className="overflow-hidden h-full" data-hs-layout-splitter-item="30.0" style={{ flex: '30 1 0px' }}>
          <div className="flex items-center justify-center h-full p-3 text-gray-800">Center</div>
        </div>
        <div className="overflow-hidden h-full" data-hs-layout-splitter-item="21.8" style={{ flex: '21.8 1 0px' }}>
          <div className="flex items-center justify-center h-full p-3 text-gray-800">Right</div>
        </div>
      </div>
    </div>
  )
}

export default ProductGrid
