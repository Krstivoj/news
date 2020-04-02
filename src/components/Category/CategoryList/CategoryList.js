import React from 'react';
import Category from "../Category/Category";

function CategoryList(props) {

    return (
        <div style={{display: 'flex', flexDirection: 'column', padding: '75px 12px 12px 12px', overflowY: 'auto'}}>
        <Category name={'Technology'}/>
        <Category name={'Education'}/>
        <Category name={'Science'}/>
        <Category name={'Business'}/>
        <Category name={'Sport'}/>
        </div>
    )
}
export default CategoryList;