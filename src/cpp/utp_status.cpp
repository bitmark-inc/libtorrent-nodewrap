// include C
#include <boost/thread.hpp>
#include "libtorrent/session.hpp"

#if defined(WIN32) || defined(_WIN32)
#define EXPORT __declspec(dllexport)
#else
#define EXPORT
#endif

using namespace libtorrent;

extern "C" {
  EXPORT utp_status* get_utp_status(session_status *s_status) {
  	return new utp_status(s_status->utp_stats);
  }
  EXPORT int get_num_idle(utp_status *utp_status) {
    return utp_status->num_idle;
  }
  EXPORT int get_num_syn_sent(utp_status *utp_status) {
    return utp_status->num_syn_sent;
  }
  EXPORT int get_num_connected(utp_status *utp_status) {
    return utp_status->num_connected;
  }
  EXPORT int get_num_fin_sent(utp_status *utp_status) {
    return utp_status->num_fin_sent;
  }
  EXPORT int get_num_close_wait(utp_status *utp_status) {
    return utp_status->num_close_wait;
  }
  EXPORT boost::uint64_t get_packet_loss(utp_status *utp_status) {
    return utp_status->packet_loss;
  }
  EXPORT boost::uint64_t get_timeout(utp_status *utp_status) {
    return utp_status->timeout;
  }
  EXPORT boost::uint64_t get_packets_in(utp_status *utp_status) {
    return utp_status->packets_in;
  }
  EXPORT boost::uint64_t get_packets_out(utp_status *utp_status) {
    return utp_status->packets_out;
  }
  EXPORT boost::uint64_t get_fast_retransmit(utp_status *utp_status) {
    return utp_status->fast_retransmit;
  }
  EXPORT boost::uint64_t get_packet_resend(utp_status *utp_status) {
    return utp_status->packet_resend;
  }
  EXPORT boost::uint64_t get_samples_above_target(utp_status *utp_status) {
    return utp_status->samples_above_target;
  }
  EXPORT boost::uint64_t get_samples_below_target(utp_status *utp_status) {
    return utp_status->samples_below_target;
  }
  EXPORT boost::uint64_t get_payload_pkts_in(utp_status *utp_status) {
    return utp_status->payload_pkts_in;
  }
  EXPORT boost::uint64_t get_payload_pkts_out(utp_status *utp_status) {
    return utp_status->payload_pkts_out;
  }
  EXPORT boost::uint64_t get_invalid_pkts_in(utp_status *utp_status) {
    return utp_status->invalid_pkts_in;
  }
  EXPORT boost::uint64_t get_redundant_pkts_in(utp_status *utp_status) {
    return utp_status->redundant_pkts_in;
  }
}