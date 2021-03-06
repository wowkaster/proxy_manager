import React, { Component } from 'react';
import ProxyItem from './_item.jsx';
import RestApi from 'restful-js';
import { Link , Route }  from 'react-router';

export default class ProxyList extends Component {

    constructor(props) {
        super(props)
        this.state = {
            proxy_list: []
        }

        this.componentDidMount = this.componentDidMount.bind(this);
        this.loadProxyListFromServer = this.loadProxyListFromServer.bind(this);
        this.onClickDelete = this.onClickDelete.bind(this);
    }

    loadProxyListFromServer() {
        RestApi.fetch('/api/proxies').then(response => {
            this.setState({"proxy_list": response.proxies});
        });
    }

    componentDidMount() {
        this.loadProxyListFromServer()
    }

    onClickDelete(proxy_id) {
        let that = this
        let response = prompt("Вы подтверждаете удаление? Если да, напишите: yes");
        if(response === 'yes') {
            RestApi.destroy('/api/proxy/' + proxy_id).then(response => {
                this.loadProxyListFromServer()
            })
        }
    }

    render() {

        let proxy_list = [];

        this.state.proxy_list.forEach((item, i) => {
            proxy_list.push((
                <ProxyItem
                    key={i}
                    id={item.id}
                    remote_addr={item.remote_addr}
                    remote_ip={item.remote_port}
                    local_addr={item.local_addr}
                    local_ip={item.local_port}
                    is_enabled={item.is_enabled}
                    last_ckeck_date={item.last_check_date}
                    onClickDelete={this.onClickDelete}
                />
            ));
        })

        return (
            <div>
                <ol className="breadcrumb">
                  <li><Link to="/">Home</Link></li>
                  <li class="active">Proxy List</li>
                </ol>
                <Link className="btn btn-success btn-xs" to="/proxy/create">Create</Link>&nbsp;
                <Link className="btn btn-success btn-xs" to="/proxy/multiple_create">Multiple Create</Link>
                <table className="table table-striped">
                    <thead>
                    <tr>
                        <th>ID</th>
                        <th>Remote Addr</th>
                        <th>Remote Port</th>
                        <th>Local Addr</th>
                        <th>Local Port</th>
                        <th>Enabled</th>
                        <th>Last Check Date</th>
                        <th></th>
                    </tr>
                    </thead>
                    <tbody>
                        {proxy_list}
                    </tbody>
                </table>
            </div>
        );
    }
}
