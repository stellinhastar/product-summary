import React, { memo } from 'react'
import { string, number, object, bool } from 'prop-types'
import ProductPrice from 'vtex.store-components/ProductPrice'

import styles from '../../productSummary.css'
import AttachmentChildren from './AttachmentChildren'

const shouldShowOption = option =>
  option.extraQuantity > 0 || option.item.sellingPriceWithAssemblies !== 0

const AttachmentItem = ({
  productText,
  price,
  assemblyOptions,
  showItemPrice,
}) => {
  const childrenAdded = (assemblyOptions && assemblyOptions.added) || []
  const childrenRemoved = (assemblyOptions && assemblyOptions.removed) || []
  const filteredChildrenAdded = childrenAdded.filter(shouldShowOption)
  const fatherColor =
    filteredChildrenAdded.length > 0 ? 'c-on-base' : 'c-muted-2'

  return (
    <div className={`${styles.attachmentItemContainer} flex flex-column pv1`}>
      <div className={`flex items-center justify-between`}>
        <span className={`t-small ${fatherColor} tl pr3`}>{productText}</span>
        {price != null && showItemPrice && (
          <ProductPrice
            sellingPrice={price}
            sellingPriceContainerClass="c-on-base"
            sellingPriceLabelClass="dib"
            sellingPriceClass="dib t-small c-muted-2"
            showListPrice={false}
            showLabels={false}
            showInstallments={false}
          />
        )}
      </div>
      <AttachmentChildren
        addedOptions={filteredChildrenAdded}
        removedOptions={childrenRemoved}
      />
    </div>
  )
}

AttachmentItem.propTypes = {
  productText: string.isRequired,
  price: number,
  assemblyOptions: object,
  showItemPrice: bool,
}

export default memo(AttachmentItem)
