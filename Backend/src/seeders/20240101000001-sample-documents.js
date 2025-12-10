'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('documents', [
      {
        filename: 'prescription_sample.pdf',
        filepath: 'uploads/prescription_sample.pdf',
        filesize: 245678,
        created_at: new Date('2024-01-15T10:30:00'),
        updated_at: new Date('2024-01-15T10:30:00')
      },
      {
        filename: 'blood_test_results.pdf',
        filepath: 'uploads/blood_test_results.pdf',
        filesize: 512340,
        created_at: new Date('2024-02-20T14:45:00'),
        updated_at: new Date('2024-02-20T14:45:00')
      },
      {
        filename: 'xray_report.pdf',
        filepath: 'uploads/xray_report.pdf',
        filesize: 1024567,
        created_at: new Date('2024-03-10T09:15:00'),
        updated_at: new Date('2024-03-10T09:15:00')
      },
      {
        filename: 'referral_note_cardiology.pdf',
        filepath: 'uploads/referral_note_cardiology.pdf',
        filesize: 187234,
        created_at: new Date('2024-04-05T16:20:00'),
        updated_at: new Date('2024-04-05T16:20:00')
      },
      {
        filename: 'vaccination_certificate.pdf',
        filepath: 'uploads/vaccination_certificate.pdf',
        filesize: 98765,
        created_at: new Date('2024-05-12T11:00:00'),
        updated_at: new Date('2024-05-12T11:00:00')
      }
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('documents', null, {});
  }
};

