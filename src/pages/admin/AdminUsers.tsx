
import React from 'react';
import AdminLayout from '../../components/admin/AdminLayout';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { Badge } from '../../components/ui/badge';
import { UserPlus, Search, Filter } from 'lucide-react';

const AdminUsers: React.FC = () => {
  const users = [
    {
      id: '1',
      name: 'John Doe',
      email: 'john@example.com',
      role: 'user',
      status: 'active',
      subscription: 'Pro Trader',
      joinDate: '2024-01-15'
    },
    {
      id: '2',
      name: 'Jane Smith',
      email: 'jane@example.com',
      role: 'user',
      status: 'active',
      subscription: 'Basic',
      joinDate: '2024-02-20'
    },
    {
      id: '3',
      name: 'Admin User',
      email: 'admin@kurzora.com',
      role: 'admin',
      status: 'active',
      subscription: 'Admin',
      joinDate: '2024-01-01'
    }
  ];

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-white mb-2">User Management</h1>
            <p className="text-slate-400">Manage user accounts and permissions</p>
          </div>
          <Button className="bg-blue-600 hover:bg-blue-700">
            <UserPlus className="h-4 w-4 mr-2" />
            Add User
          </Button>
        </div>

        <Card className="bg-slate-800/50 backdrop-blur-sm border-slate-700">
          <CardHeader>
            <div className="flex justify-between items-center">
              <CardTitle className="text-white">All Users</CardTitle>
              <div className="flex space-x-2">
                <Button variant="outline" size="sm" className="border-slate-600 text-slate-300">
                  <Search className="h-4 w-4 mr-2" />
                  Search
                </Button>
                <Button variant="outline" size="sm" className="border-slate-600 text-slate-300">
                  <Filter className="h-4 w-4 mr-2" />
                  Filter
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-slate-700">
                    <th className="text-left py-3 px-4 text-slate-300 font-medium">User</th>
                    <th className="text-left py-3 px-4 text-slate-300 font-medium">Role</th>
                    <th className="text-left py-3 px-4 text-slate-300 font-medium">Status</th>
                    <th className="text-left py-3 px-4 text-slate-300 font-medium">Subscription</th>
                    <th className="text-left py-3 px-4 text-slate-300 font-medium">Join Date</th>
                    <th className="text-left py-3 px-4 text-slate-300 font-medium">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {users.map((user) => (
                    <tr key={user.id} className="border-b border-slate-700/50">
                      <td className="py-3 px-4">
                        <div>
                          <div className="text-white font-medium">{user.name}</div>
                          <div className="text-slate-400 text-sm">{user.email}</div>
                        </div>
                      </td>
                      <td className="py-3 px-4">
                        <Badge variant={user.role === 'admin' ? 'destructive' : 'secondary'}>
                          {user.role}
                        </Badge>
                      </td>
                      <td className="py-3 px-4">
                        <Badge variant="outline" className="text-green-400 border-green-400">
                          {user.status}
                        </Badge>
                      </td>
                      <td className="py-3 px-4 text-slate-300">{user.subscription}</td>
                      <td className="py-3 px-4 text-slate-300">{user.joinDate}</td>
                      <td className="py-3 px-4">
                        <div className="flex space-x-2">
                          <Button variant="outline" size="sm" className="border-slate-600 text-slate-300">
                            Edit
                          </Button>
                          <Button variant="outline" size="sm" className="border-red-600 text-red-400">
                            Delete
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  );
};

export default AdminUsers;
