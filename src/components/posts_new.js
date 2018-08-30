import React,{Component} from 'react';
import {Field,reduxForm} from 'redux-form';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import {createPost} from '../actions';



class PostsNew extends Component{
/*this field arg contains both redux props passed through and props user defined in the field
*/
  renderField(field){
    const {meta:{touched,error}}=field;
    {/* meta is extracted from field
        touched and error are extracted from meta using es6 syntax
      */}
    const className=`form-group ${touched && error ? 'has-danger':''}`
    return(
      <div className={className}>
      <label>{field.label}</label>
        <input className="form-control"
        type="text"
          {...field.input}
        />
{/*      //field.meta.touched says whether user touched that field if so display the error present in field.meta.error which is from validate()
//field.meta.error will display particuarly set by the validate function to that corresponding name set in Field
*/}
<div className="text-help">
        {touched ? error:''}
</div>
      </div>
    );
  }
//history is available in props as Route is the one which directed to  this component
onSubmit(values)
{
//using history in the call back function we are redirecting to home page once the creatPost function is exceuted successfully
  this.props.createPost(values,()=>{
        this.props.history.push('/');
  });
}

  render(){
    const {handleSubmit}=this.props;
    {/*/this handleSubmit is used by redux to check state, check for validation using validate() used below
    //one redux throws no error, then redux calls the callback function we defined
    // we are calling onSubmit function
    the call has to be onSubmit eventually
    */}
      return(
        <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
      {/*Field is used for any type of field we want in form
        //component is the one which will be rendered in this place
      */}
         <Field name="title" label="Title" component={this.renderField}/>
          <Field name="categories" label="Categories" component={this.renderField}/>
          <Field name="content" label=" Post Content" component={this.renderField}/>
          <button type="submit" className="btn btn-primary">Submit</button>
          <Link to="/" className="btn btn-danger">Cancel</Link>

        </form>
      );
  }
}
/*
//if validate returns a empty object, then redux passes the form, else is not goin anywhere
//valudate is the function that will be executed by redux-form
//values are the field values passed to validate function by redux-form
*/

function validate(values){
  const errors={};
{/*/title, categories, content should match to the name of the field we gave, so that respective errors propagate at that place
*/}
  if(!values.title)
    errors.title="Enter a title!";
  if(!values.categories)
    errors.categories="Enter some categories";
  if(!values.content)
    errors.content="enter some content please";
{/* if errors is empty the form is fine to submit*/}
  return errors;
}


/* validate function will be automatically called when user submits form*/
export default reduxForm({
  validate,
  form:'PostsNewForm'
})(
  connect(null,{createPost})(PostsNew)
);
/*
// this form can directly communicate with reducer because of reduxForm
//redux can only validate and track state of the fields but cannot submit the form, we have to do it

// 3 different states of form
//1. prisitine- no input has been touched
//2. touched- user touched input ; did somehing and focus away
//3.invalid- when submitted
*/
