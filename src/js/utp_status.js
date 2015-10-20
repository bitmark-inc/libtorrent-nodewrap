var ffi = require('ffi');
var path = require('path');
var external_lib = require('./load_external_library');

// get root dir
var root_dir = __dirname.replace('/src/js', '/');

module.exports = function() {

  var utp_status = ffi.Library(path.resolve(root_dir, 'src/cpp/utp_status'), {
    'get_utp_status': [ 'pointer', ['pointer'] ],
    'get_num_idle': [ 'int', ['pointer'] ],
    'get_num_syn_sent': [ 'int', ['pointer'] ],
    'get_num_connected': [ 'int', ['pointer'] ],
    'get_num_fin_sent': [ 'int', ['pointer'] ],
    'get_num_close_wait': [ 'int', ['pointer'] ],
    'get_packet_loss': [ 'uint64', ['pointer'] ],
    'get_timeout': [ 'uint64', ['pointer'] ],
    'get_packets_in': [ 'uint64', ['pointer'] ],
    'get_packets_out': [ 'uint64', ['pointer'] ],
    'get_fast_retransmit': [ 'uint64', ['pointer'] ],
    'get_packet_resend': [ 'uint64', ['pointer'] ],
    'get_samples_above_target': [ 'uint64', ['pointer'] ],
    'get_samples_below_target': [ 'uint64', ['pointer'] ],
    'get_payload_pkts_in': [ 'uint64', ['pointer'] ],
    'get_payload_pkts_out': [ 'uint64', ['pointer'] ],
    'get_invalid_pkts_in': [ 'uint64', ['pointer'] ],
    'get_redundant_pkts_in': [ 'uint64', ['pointer'] ],
  });


  var UtpStatus = function(session_status_ptr) {

    // initial session point
    var _s_status = session_status_ptr;

    // get session status pointer
    var _utp_status = utp_status.get_utp_status(_s_status);

    this.num_idle = utp_status.get_num_idle(_utp_status);
    this.num_syn_sent = utp_status.get_num_syn_sent(_utp_status);
    this.num_connected = utp_status.get_num_connected(_utp_status);
    this.num_fin_sent = utp_status.get_num_fin_sent(_utp_status);
    this.num_close_wait = utp_status.get_num_close_wait(_utp_status);
    this.packet_loss = utp_status.get_packet_loss(_utp_status);
    this.timeout = utp_status.get_timeout(_utp_status);
    this.packets_in = utp_status.get_packets_in(_utp_status);
    this.packets_out = utp_status.get_packets_out(_utp_status);
    this.fast_retransmit = utp_status.get_fast_retransmit(_utp_status);
    this.packet_resend = utp_status.get_packet_resend(_utp_status);
    this.samples_above_target = utp_status.get_samples_above_target(_utp_status);
    this.samples_below_target = utp_status.get_samples_below_target(_utp_status);
    this.payload_pkts_in = utp_status.get_payload_pkts_in(_utp_status);
    this.payload_pkts_out = utp_status.get_payload_pkts_out(_utp_status);
    this.invalid_pkts_in = utp_status.get_invalid_pkts_in(_utp_status);
    this.redundant_pkts_in = utp_status.get_redundant_pkts_in(_utp_status);
  }

  return UtpStatus;
}();