import React, { useState } from 'react'
import { Form, Input, Button } from 'antd';

 function LoginForm( { Login, error } ) {
    const [details, setDetails] = useState({name:"", email:"", password:""})

    const submitHandler = e => {
        e.preventDefault();

        Login(details);
    }

    return (
        <div>
            <Form onSubmit={submitHandler}>
                <div className="form-inner">
                    {/* ERROR! */}
                    {(error !== "") ? (
                        <div className="error">
                            {error}
                        </div>
                    ):""}
                    <Form.Item>
                        <div className="form-group">
                            <label htmlFor="name">Name:</label>
                            <Input type="text" name="name" id="name" onChange={e => setDetails({...details, name:e.target.value})} value={details.name}/>
                        </div>
                    </Form.Item>
                    <Form.Item>
                        <div className="form-group">
                            <label htmlFor="email">Email:</label>
                            <Input type="email" name="email" id="email" onChange={e => setDetails({...details, email:e.target.value})} value={details.email}/>
                        </div>
                    </Form.Item>
                    <Form.Item>
                        <div className="form-group">
                            <label htmlFor="password">Password:</label>
                            <Input type="password" name="password" id="password" onChange={e => setDetails({...details, password:e.target.value})} value={details.password}/>
                        </div>
                    </Form.Item>
                    <Button type="submit">
                        Submit
                    </Button>
                </div>
            </Form>
        </div>
    )
}

export default LoginForm;
