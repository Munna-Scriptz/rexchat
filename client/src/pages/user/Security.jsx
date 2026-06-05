import React, { useState } from 'react'
import Inputs from '../../components/ui/Inputs'
import Button from '../../components/ui/Buttons'
import { FiCheck, FiLock, FiShield } from 'react-icons/fi'
import { useResetPasswordMutation } from '../../api'

const Security = () => {
    const [resetPassword, { isLoading: isResettingPassword }] = useResetPasswordMutation();
    const [passwordForm, setPasswordForm] = useState({
        currentPassword: '',
        newPassword: '',
        confirmPassword: '',
        currentPasswordErr: '',
        newPasswordErr: '',
        confirmPasswordErr: '',
    });

    const handlePasswordChange = (key, value) => {
        setPasswordForm((prev) => ({ ...prev, [key]: value, [`${key}Err`]: '' }));
    };

    const handlePasswordSubmit = async (event) => {
        event.preventDefault();

        if (!passwordForm.currentPassword) {
            return setPasswordForm((prev) => ({ ...prev, currentPasswordErr: 'Current password is required' }));
        }
        if (!passwordForm.newPassword) {
            return setPasswordForm((prev) => ({ ...prev, newPasswordErr: 'New password is required' }));
        }
        if (passwordForm.newPassword.length < 6) {
            return setPasswordForm((prev) => ({ ...prev, newPasswordErr: 'Password must be at least 6 characters' }));
        }
        if (passwordForm.newPassword !== passwordForm.confirmPassword) {
            return setPasswordForm((prev) => ({ ...prev, confirmPasswordErr: 'Passwords do not match' }));
        }

        try {
            await resetPassword({
                currentPassword: passwordForm.currentPassword,
                newPassword: passwordForm.newPassword,
            }).unwrap();
            setPasswordForm({
                currentPassword: '',
                newPassword: '',
                confirmPassword: '',
                currentPasswordErr: '',
                newPasswordErr: '',
                confirmPasswordErr: '',
            });
            toast.success('Password reset successfully');
        } catch (error) {
            toast.error(error?.data?.message || 'Could not reset password');
        }
    };
    return (
        <div className="grid grid-cols-1 xl:grid-cols-[minmax(0,1fr)_320px] gap-4 md:gap-5">
            <section className="rounded-xl border border-border bg-surface shadow-sm">
                <div className="p-5 border-b border-border/70">
                    <div className="flex items-center gap-2">
                        <FiLock className="text-accent" />
                        <h2 className="text-base font-bold text-text-primary">Change password</h2>
                    </div>
                    <p className="mt-1 text-sm text-text-secondary">Use a password you do not use on other sites.</p>
                </div>
                <form onSubmit={handlePasswordSubmit} className="p-5 grid grid-cols-1 md:grid-cols-3 gap-4">
                    <Inputs
                        label="Current password"
                        id="current-password"
                        type="password"
                        placeholder="Current password"
                        value={passwordForm.currentPassword}
                        error={passwordForm.currentPasswordErr}
                        onChange={(event) => handlePasswordChange('currentPassword', event.target.value)}
                        disabled={isResettingPassword}
                    />
                    <Inputs
                        label="New password"
                        id="new-password"
                        type="password"
                        placeholder="New password"
                        value={passwordForm.newPassword}
                        error={passwordForm.newPasswordErr}
                        onChange={(event) => handlePasswordChange('newPassword', event.target.value)}
                        disabled={isResettingPassword}
                    />
                    <Inputs
                        label="Confirm password"
                        id="confirm-password"
                        type="password"
                        placeholder="Confirm password"
                        value={passwordForm.confirmPassword}
                        error={passwordForm.confirmPasswordErr}
                        onChange={(event) => handlePasswordChange('confirmPassword', event.target.value)}
                        disabled={isResettingPassword}
                    />
                    <div className="md:col-span-3 flex justify-end">
                        <Button type="submit" variant="secondary" size="md" isLoading={isResettingPassword}>
                            Update password
                        </Button>
                    </div>
                </form>
            </section>

            <section className="rounded-xl border border-border bg-surface p-5">
                <FiShield className="text-2xl text-online" />
                <h2 className="mt-4 text-base font-bold text-text-primary">Account protection</h2>
                <div className="mt-4 space-y-3 text-sm text-text-secondary">
                    <p className="flex items-center gap-2"><FiCheck className="text-online" /> Email connected</p>
                    <p className="flex items-center gap-2"><FiCheck className="text-online" /> Password login enabled</p>
                    <p className="flex items-center gap-2"><FiCheck className="text-online" /> Profile visibility active</p>
                </div>
            </section>
        </div>
    )
}

export default Security